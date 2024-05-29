import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Box, Dialog, DialogTitle, Grid, Typography } from "@mui/material";
import ScheduleForm from "../../components/form/ScheduleForm";
import { getScheduleAPI, insertScheduleAPI, deleteScheduleAPI, updateScheduleAPI } from "../../apis/ScheduleAPICalls";
import moment from "moment";
import { decodeJwt } from "../../utils/tokenUtils";
import ScheduleDetail from "../../components/form/ScheduleDetail";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SubscriptionList from "../../components/lists/subscriptions/SubscriptionList";

const Calendar = () => {
    const dispatch = useDispatch();
    const schedules = useSelector(state => state.scheduleReducer);
    const members = useSelector(state => state.memberReducer);
    const memberList = members?.data?.content || [];
    const [calendarReady, setCalendarReady] = useState(false);
    const [newScheduleAdded, setNewScheduleAdded] = useState(false);
    const [insertScheduleDialogOpen, setInsertScheduleDialogOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [scheduleDetail, setScheduleDetail] = useState(null);
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const dptNo = token?.depNo;
    const authorName = token?.memberName;
    const authorId = token?.memberNo;
    const [dateError, setDateError] = useState("");
    const [skdNameError, setSkdNameError] = useState("");
    const [touched, setTouched] = useState({
        skdName: false,
        skdStartDttm: false,
        skdEndDttm: false
    });
    const [subscribedMembers, setSubscribedMembers] = useState([]);

    useEffect(() => {
        const fetchSchedules = () => {
            dispatch(getScheduleAPI(dptNo));
            setCalendarReady(true);
        };
        fetchSchedules();
    }, [dispatch, newScheduleAdded]);

    const handleParticipantsChange = (event) => {
        const selectedValues = event.target.value;
        const selectedParticipants = selectedValues.map(value => {
            const member = memberList.find(member => member.memberNo === value);
            return { participantMemberNo: member?.memberNo, participantName: member?.memberName };
        });

        setNewScheduleData({
            ...newScheduleData,
            participants: selectedParticipants
        });
    };

    const [newScheduleData, setNewScheduleData] = useState({
        dptNo: dptNo,
        skdName: "",
        skdStartDttm: "",
        skdEndDttm: "",
        skdLocation: "",
        skdMemo: "",
        authorId: authorId,
        authorName: authorName,
        participants: [],
        skdStatus: "예정"
    });
    const [updatedScheduleData, setUpdatedScheduleData] = useState({
        participants: []
    });

    useEffect(() => {
        if (touched.skdName || touched.skdStartDttm || touched.skdEndDttm) {
            validateInsert();
        }
    }, [newScheduleData, touched]);

    const validateInsert = () => {
        const start = moment(newScheduleData.skdStartDttm);
        const end = moment(newScheduleData.skdEndDttm);

        // if (newScheduleData.skdName.length < 5) {
        //     setSkdNameError("일정 제목은 공란일 수 없고 공백 포함 최소 5글자 이상이어야 합니다.");
        //     return;
        // }

        // if (newScheduleData.skdName.length > 200) {
        //     setSkdNameError("일정 제목은 공백 포함 최대 200자까지 입력할 수 있습니다.");
        //     return;
        // }

        if (!newScheduleData.skdStartDttm || !newScheduleData.skdEndDttm) {
            setDateError("일정 시작 일시와 종료 일시를 모두 입력해주세요.");
            return;
        }

        if (start.isSameOrAfter(end)) {
            setDateError("일정 시작일시는 종료일시보다 이전이어야 합니다.");
            return;
        }

        setSkdNameError("");
        setDateError("");
    };

    useEffect(() => {
        if (schedules.results && schedules.results.schedule) {
            setCalendarReady(true);
        }
    }, [schedules]);

    const onDateClickHandler = () => {
        setNewScheduleData({
            dptNo: dptNo,
            skdName: "",
            skdStartDttm: "",
            skdEndDttm: "",
            skdLocation: "",
            skdMemo: "",
            authorId: authorId,
            authorName: authorName,
            participants: [],
            skdStatus: "예정"
        });
        setInsertScheduleDialogOpen(true);
    };
    const onInsertCancelHandler = () => { setInsertScheduleDialogOpen(false); };
    const openDetailDialog = () => { setDetailDialogOpen(true); };
    const closeDetailDialog = () => { setDetailDialogOpen(false); };

    const onEventClickHandler = (selected) => {
        openDetailDialog();
        setSelectedEvent(selected.event);
    };

    const onDelete = () => { setConfirmDeleteOpen(true); };
    const onCloseConfirmDelete = () => { setConfirmDeleteOpen(false); };

    const handleConfirmDelete = () => {
        try {
            handleDelete(selectedEvent);
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error("일정 삭제 중 에러 발생 handleDelete: ", error);
        }
    };

    const handleDelete = (event) => {
        if (event) {
            try {
                deleteScheduleAPI(event.id);
                dispatch(getScheduleAPI(dptNo));
                closeDetailDialog();
            } catch (error) {
                console.error("일정 삭제 중 에러 발생 handleDelete: ", error);
                alert("일정 삭제에 실패했습니다.");
            }
        }
    };

    const handleUpdateEvent = (selectedEvent, updatedScheduleData) => {
        try {
            updateScheduleAPI(selectedEvent.id, updatedScheduleData);
            alert("일정을 정상적으로 수정하였습니다.");
            dispatch(getScheduleAPI(dptNo));
        } catch (error) {
            console.error("일정 수정 중 에러 발생 handleUpdate: ", error);
            alert("일정 수정에 실패했습니다.");
        }
        closeDetailDialog();
    };

    useEffect(() => {
        if (selectedEvent != null) {
            const skdNo = selectedEvent.id;
            const detail = fetchEvents().find(event => event.id == skdNo);
            if (detail) {
                setScheduleDetail(detail);
            } else {
                console.log("일치하는 일정 정보를 찾을 수 없습니다.");
            }
        } else {
            setScheduleDetail(null);
        }
    }, [selectedEvent, schedules]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewScheduleData({
            ...newScheduleData,
            [name]: value
        });

        if (name === "skdName" && value.length < 5) {
            setSkdNameError("일정 이름은 공란일 수 없고 공백 포함 최소 5글자 이상이어야 합니다.");
            return;
        }

        setTouched({
            ...touched,
            [name]: true
        });
    };

    const handleSubmit = (newScheduleData) => {
        validateInsert();
        if (skdNameError || dateError) {
            return;
        }

        try {
            insertScheduleAPI(newScheduleData);
            alert("일정이 정상적으로 등록되었습니다.");
            console.log("API로 등록할때의 newScheduleData", newScheduleData);
            setNewScheduleAdded(!newScheduleAdded);
        } catch (error) {
            console.error("일정 정보 등록하면서 오류가 발생했습니다 :", error);
            alert("일정 등록에 실패하였습니다.");
        }
        onInsertCancelHandler();
        setNewScheduleData("");
    };

    const getEventColor = (skdStatus) => {
        switch (skdStatus) {
            case '예정': return 'yellow';
            case '진행 중': return 'blue';
            case '완료': return 'green';
            case '보류': return 'yellow';
            case '막힘': return 'red';
            default: return '#95A5A6';
        }
    };

    const fetchEvents = () => {
        try {
            const events = schedules.results.schedule.map(schedule => ({
                title: schedule.skdName,
                start: moment(schedule.skdStartDttm, "YYYY-MM-DD A h:mm").toISOString(),
                end: moment(schedule.skdEndDttm, "YYYY-MM-DD A h:mm").toISOString(),
                id: schedule.skdNo,
                extendedProps: {
                    skdLocation: schedule.skdLocation,
                    skdMemo: schedule.skdMemo,
                    authorId: schedule.authorId,
                    authorName: schedule.authorName,
                    skdStatus: schedule.skdStatus,
                    participants: [
                        {
                            participantMemberNo: schedule.participants.participantMemberNo,
                            participantName: schedule.participants.participantName,
                            participantNo: schedule.participants.participantNo
                        }
                    ]
                },
                backgroundColor: getEventColor(schedule.skdStatus),
                borderColor: getEventColor(schedule.skdStatus)
            }));
            return events;
        } catch (error) {
            return [];
        }
    };

    const transformScheduleList = (scheduleList) => {
        return scheduleList.map(schedule => ({
            title: schedule.skdName,
            start: moment(schedule.skdStartDttm).toISOString(),
            end: moment(schedule.skdEndDttm).toISOString(),
            id: schedule.skdNo,
            extendedProps: {
                skdLocation: schedule.skdLocation,
                skdMemo: schedule.skdMemo,
                authorId: schedule.authorId,
                authorName: schedule.authorName,
                skdStatus: schedule.skdStatus,
                participants: schedule.participants.map(participant => ({
                    participantMemberNo: participant.participantMemberNo,
                    participantName: participant.participantName,
                    participantNo: participant.participantNo
                }))
            },
            backgroundColor: getEventColor(schedule.skdStatus),
            borderColor: getEventColor(schedule.skdStatus)
        }));
    };

    const filteredScheduleList = schedules.results?.schedule?.filter(schedule => 
        subscribedMembers.includes(schedule.authorId)
    ) || [];

    const transformedEvents = transformScheduleList(filteredScheduleList);

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>부서별 일정</h2>
            </div>
            {calendarReady && (
                <Box flex="1 1 100%" ml="15px" mt="15px" >
                    <Grid item md>
                        <FullCalendar
                            locale="ko"
                            height="100vh"
                            eventColor='red'
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin
                            ]}
                            headerToolbar={{
                                left: "prev next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            dayMaxEvents={true}
                            select={onDateClickHandler}
                            eventClick={onEventClickHandler}
                            // events={filteredScheduleList}
                            events={transformedEvents}
                            // events={fetchEvents()}
                            buttonText={{
                                today: '오늘',
                                month: '월',
                                week: '주',
                                day: '일',
                                list: '목록'
                            }}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid maxWidth={'350px'}>
                             <SubscriptionList
                            subscribedMembers={subscribedMembers}
                            setSubscribedMembers={setSubscribedMembers}
                        />
                        </Grid>

                    </Grid>
                </Box>
            )}

            <Dialog open={insertScheduleDialogOpen} onClose={onInsertCancelHandler} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: "10px" } }}>
                <DialogTitle variant="h4" ml={3} mt={3}>일정 등록</DialogTitle>
                <ScheduleForm
                    newScheduleData={newScheduleData}
                    onInsertCancelHandler={onInsertCancelHandler}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    handleParticipantsChange={handleParticipantsChange}
                    skdNameError={skdNameError}
                    dateError={dateError}
                    setTouched={setTouched}
                    touched={touched}
                    memberList={memberList}
                    dptNo={dptNo}
                />
            </Dialog>

            <Dialog open={detailDialogOpen} onClose={closeDetailDialog} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: "10px" } }}>
                <ScheduleDetail
                    open={detailDialogOpen}
                    inputChangeHandler={handleInputChange}
                    scheduleDetail={scheduleDetail}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdateEvent}
                    closeDetailDialog={closeDetailDialog}
                    onCloseConfirmDelete={onCloseConfirmDelete}
                    memberList={memberList}
                    dptNo={dptNo}
                />
            </Dialog>
        </main>
    );
};

export default Calendar;
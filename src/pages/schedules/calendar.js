import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import ScheduleForm from "../../components/form/ScheduleForm";
import { getScheduleAPI, insertScheduleAPI, deleteScheduleAPI, updateScheduleAPI } from "../../apis/ScheduleAPICalls";
import moment from "moment";
import { decodeJwt } from "../../utils/tokenUtils";
import ScheduleDetail from "../../components/form/ScheduleDetail";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // webpack uses file-loader to handle font files

const Calendar = () => {
    const schedules = useSelector(state => state.scheduleReducer);
    const [calendarReady, setCalendarReady] = useState(false);
    const [newScheduleAdded, setNewScheduleAdded] = useState(false);
    const [insertScheduleDialogOpen, setInsertScheduleDialogOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [scheduleDetail, setScheduleDetail] = useState(null);
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const dptNo = token?.depNo;
    const [dateError, setDateError] = useState("");
    const [skdNameError, setSkdNameError] = useState("");
    const [touched, setTouched] = useState({
        skdName: false,
        skdStartDttm: false,
        skdEndDttm: false
    });

    useEffect(() => {
        const fetchSchedules = () => {
            dispatch(getScheduleAPI(dptNo));
            setCalendarReady(true);
        };
        fetchSchedules();
    }, [dispatch, newScheduleAdded]);

    const [newScheduleData, setNewScheduleData] = useState({
        dptNo: dptNo,
        skdName: "",
        skdStartDttm: "",
        skdEndDttm: "",
        skdLocation: "",
        skdMemo: ""
    });

    useEffect(() => {
        if (touched.skdName || touched.skdStartDttm || touched.skdEndDttm) {
            validateInsert();
        }
    }, [newScheduleData, touched]);

    const validateInsert = () => {
        const start = moment(newScheduleData.skdStartDttm);
        const end = moment(newScheduleData.skdEndDttm);

        // length를 읽을 수 없다고 함.
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

    // const validateUpdate = (updatedScheduleData) => {
    //     const start = moment(updatedScheduleData.skdStartDttm);
    //     const end = moment(updatedScheduleData.skdEndDttm);

    //     if (updatedScheduleData.skdName.length < 5) {
    //         setSkdNameError("일정 제목은 공란일 수 없고 공백 포함 최소 5글자 이상이어야 합니다.");
    //         return;
    //     }

    //     if (updatedScheduleData.skdName.length > 200) {
    //         setSkdNameError("일정 제목은 공백 포함 최대 200자까지 입력할 수 있습니다.");
    //         return;
    //     }

    //     if (!updatedScheduleData.skdStartDttm || !updatedScheduleData.skdEndDttm) {
    //         setDateError("일정 시작 일시와 종료 일시를 모두 입력해주세요.");
    //         return;
    //     }

    //     if (start.isSameOrAfter(end)) {
    //         setDateError("일정 시작일시는 종료일시보다 이전이어야 합니다.");
    //         return;
    //     }

    //     setSkdNameError("");
    //     setDateError("");
    // };

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
            skdMemo: ""
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
        // validateUpdate(updatedScheduleData);
        // if (skdNameError || dateError) {
        //     console.log("skdNameError true이면 얘가 문제", skdNameError);
        //     console.log("dateError true이면 얘가 문제", dateError);
        //     console.log("updatedScheduleData", updatedScheduleData);
        //     console.log("유효성 검사를 통과하지 못했기때문에 handleUpdateEvent를 실행하지 않습니다.");
        //     return;
        // }

        // console.log("updateScheduleAPI 호출 이전의 selectedEvent:", selectedEvent);
        // console.log("updateScheduleAPI 호출 이전의 updatedScheduleData:", updatedScheduleData);

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
            [name]: value
        });
    };


    const handleSubmit = (newScheduleData) => {
        validateInsert();
        if (skdNameError || dateError) {
            return;
        }

        try {
            console.log("insertAPI 호출 직전의 newScheduleData", newScheduleData);
            insertScheduleAPI(newScheduleData);
            alert("일정이 정상적으로 등록되었습니다.");
            setNewScheduleAdded(!newScheduleAdded);
        } catch (error) {
            console.error("일정 정보 등록하면서 오류가 발생했습니다 :", error);
            alert("일정 등록에 실패하였습니다.");
        }
        onInsertCancelHandler();
        setNewScheduleData("");
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
                    skdMemo: schedule.skdMemo
                }
            }));
            return events;
        } catch (error) {
            return [];
        }
    };

    return (
        <main id="main" className="main">
            {calendarReady && (
                <Box flex="1 1 100%" ml="15px" mt="15px" >
                    <h2>부서별 일정</h2>
                    <FullCalendar
                        locale="ko"
                        height="100vh"
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        dayMaxEvents={true}
                        select={onDateClickHandler}
                        eventClick={onEventClickHandler}
                        events={fetchEvents()}
                        buttonText={{
                            today: '오늘',
                            month: '월',
                            week: '주',
                            day: '일',
                            list: '목록'
                        }}
                        themeSystem='United'
                    />
                </Box>
            )}

            <Dialog open={insertScheduleDialogOpen} onClose={onInsertCancelHandler} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: "10px" } }}>
                <DialogTitle variant="h4" ml={3} mt={3}>일정 등록</DialogTitle>
                <ScheduleForm
                    newScheduleData={newScheduleData}
                    onInsertCancelHandler={onInsertCancelHandler}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    skdNameError={skdNameError}
                    dateError={dateError}
                    setTouched={setTouched}
                    touched={touched}
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
                    skdNameError={skdNameError}
                    dateError={dateError}
                    setTouched={setTouched}
                    touched={touched}
                    // validateUpdate={validateUpdate}
                />
            </Dialog>
        </main>
    );
};

export default Calendar;
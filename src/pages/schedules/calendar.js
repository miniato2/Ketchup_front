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

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const token = decodeJwt(window.localStorage.getItem("accessToken"));
                const dptNo = token.depNo;

                if (dptNo) {
                    await dispatch(getScheduleAPI(dptNo));
                    setCalendarReady(true);
                }
            } catch (error) {
                console.error("fetchSchedules 도중 에러 발생: ", error);
            }
        };
        fetchSchedules();
    }, [dispatch, newScheduleAdded]);

    const [newScheduleData, setNewScheduleData] = useState({
        skdNo: "",
        dptNo: "",
        skdName: "",
        skdStartDttm: "",
        skdEndDttm: "",
        skdLocation: "",
        skdMemo: ""
    });

    useEffect(() => {
        if (schedules.results && schedules.results.schedule) {
            setCalendarReady(true);
        }
    }, [schedules]);

    const onDateClickHandler = () => { setInsertScheduleDialogOpen(true); };
    const onInsertCancelHandler = () => { setInsertScheduleDialogOpen(false); };
    const openDetailDialog = () => { setDetailDialogOpen(true); };
    const closeDetailDialog = () => { setDetailDialogOpen(false); };
    const handleDateClick = () => { onDateClickHandler(); };

    const onEventClickHandler = (selected) => {
        openDetailDialog();
        setSelectedEvent(selected.event);
    };

    const onDelete = () => { setConfirmDeleteOpen(true); };
    const onCloseConfirmDelete = () => { setConfirmDeleteOpen(false); };

    const handleConfirmDelete = async () => {
        try {
            await handleDelete(selectedEvent);
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error("일정 삭제 중 에러 발생 handleDelete: ", error);
        }
    };

    const handleDelete = async (event) => {
        if (event) {
            try {
                await deleteScheduleAPI(event.id);

                const token = decodeJwt(window.localStorage.getItem("accessToken"));
                const dptNo = token.depNo;

                if (dptNo) {
                    await dispatch(getScheduleAPI(dptNo));
                }

            } catch (error) {
                console.error("일정 삭제 중 에러 발생 handleDelete: ", error);
                alert("일정 삭제에 실패했습니다.");
            }
            closeDetailDialog();
        }
    };

    const handleUpdateEvent = async (selectedEvent, updatedScheduleData) => {
        try {
            await updateScheduleAPI(selectedEvent.id, updatedScheduleData);
            alert("일정을 정상적으로 수정하였습니다.");

            const token = decodeJwt(window.localStorage.getItem("accessToken"));
            const dptNo = token.depNo;

            if (dptNo) {
                await dispatch(getScheduleAPI(dptNo));
            }
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

    const handleSubmit = async (newScheduleData) => {
        try {
            await insertScheduleAPI(newScheduleData);
            alert("일정이 정상적으로 등록되었습니다.");
            setNewScheduleAdded(!newScheduleAdded);
        } catch (error) {
            console.error("일정 정보 등록하면서 오류가 발생했습니다 :", error);
            alert("일정 등록에 실패하였습니다.");
        }
        onInsertCancelHandler();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewScheduleData({
            ...newScheduleData,
            [name]: value
        });
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
                <Box flex="1 1 100%" ml="15px" mt="15px" sx={{ a: { textDecoration: 'none', color: '#444444' } }}>
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
                        themeSystem= 'united'
                    />
                </Box>
            )}

            <Dialog open={insertScheduleDialogOpen} onClose={onInsertCancelHandler}>
                <DialogTitle>일정 등록</DialogTitle>
                <ScheduleForm
                    newScheduleData={newScheduleData}
                    onInsertCancelHandler={onInsertCancelHandler}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                />
            </Dialog>

            <Dialog open={detailDialogOpen} onClose={closeDetailDialog}>
                <DialogTitle>상세 정보</DialogTitle>
                <ScheduleDetail
                    inputChangeHandler={handleInputChange}
                    scheduleDetail={scheduleDetail}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdateEvent}
                    closeDetailDialog={closeDetailDialog}
                    onCloseConfirmDelete={onCloseConfirmDelete}
                />
            </Dialog>
        </main>
    );
};

export default Calendar;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Box, Dialog, DialogTitle } from "@mui/material";
import ScheduleForm from "../../components/form/ScheduleForm";
import { getScheduleAPI, insertScheduleAPI, deleteScheduleAPI } from "../../apis/ScheduleAPICalls";
import moment from "moment";
import { decodeJwt } from "../../utils/tokenUtils";
import { Tooltip } from "bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import ScheduleDetail from "../../components/form/ScheduleDetail";

const Calendar = () => {
    const schedules = useSelector(state => state.scheduleReducer);
    const [calendarReady, setCalendarReady] = useState(false);
    const [newScheduleAdded, setNewScheduleAdded] = useState(false);
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

    const [insertScheduleDialogOpen, setInsertScheduleDialogOpen] = useState(false);
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

    const onDateClickHandler = () => {
        setInsertScheduleDialogOpen(true);
    };

    const onInsertCancelHandler = () => {
        setInsertScheduleDialogOpen(false);
    };

    const openDetailDialog = () => {
        setDetailDialogOpen(true);
    };

    const closeDetailDialog = () => {
        setDetailDialogOpen(false);
    };

    const handleDateClick = () => {
        onDateClickHandler();
    };

    const onEventClickHandler = (info) => {
        setSelectedEvent(info.event);
        openDetailDialog();
    };

    const handleDelete = async () => {
        if (selectedEvent) {
            try {
                await deleteScheduleAPI(selectedEvent.id);
                alert("일정이 정상적으로 삭제되었습니다.");
                setCalendarReady(false);
            } catch (error) {
                console.error("일정 삭제 중 에러 발생: ", error);
                alert("일정 삭제에 실패했습니다.");
            }
            closeDetailDialog();
        }
    };

    useEffect(() => {
        if (selectedEvent) {
            const skdNo = selectedEvent.id;
            const detail = schedules.results.schedule.find(schedule => schedule.skdNo === skdNo);
            setScheduleDetail(detail);
        }
    }, [selectedEvent, schedules]);


    // const handleUpdate = async () => {
    //     // TODO LIST: 수정 로직 구현 필요함
    // };

    const handleSubmit = async (newScheduleData) => {
        try {
            await insertScheduleAPI(newScheduleData);
            alert("일정이 정상적으로 등록되었습니다.");
            setNewScheduleAdded(!newScheduleAdded);
        } catch (error) {
            console.error("Error submitting schedule data:", error);
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
                id: schedule.skdNo
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
                        // eventDidMount={(info) => {
                        //     return new Tooltip(info.el, {
                        //         title: info.event.title,
                        //         placement: "auto",
                        //         trigger: "hover",
                        //         customClass: "popoverStyle",
                        //         content: "<p>제발?</p>",
                        //         html: true,
                        //     })}}
                        eventDidMount={(info) => (
                            <OverlayTrigger
                                placement="auto"
                                trigger={"hover"}
                                overlay={
                                    <Tooltip id="tooltip">
                                        <strong>{info.event.title}</strong>
                                        <div>내용</div>
                                    </Tooltip>
                                }
                            >
                                {info.el}
                            </OverlayTrigger>
                        )}
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
                    handleInputChange={handleInputChange}
                    />
            </Dialog>
        </main>
    );
};

export default Calendar;

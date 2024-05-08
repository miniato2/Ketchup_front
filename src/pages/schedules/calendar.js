import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Box, Dialog, DialogTitle } from "@mui/material";
import ScheduleForm from "../../components/form/ScheduleForm";
import { getScheduleAPI, insertScheduleAPI } from "../../apis/ScheduleAPICalls";
import moment from "moment";

const Calendar = () => {
    const schedules = useSelector(state => state.scheduleReducer);
    const [calendarReady, setCalendarReady] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const dptNo = 5;
        dispatch(getScheduleAPI(dptNo));
    }, [dispatch]);

    const [openDialog, setOpenDialog] = useState(false);
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
        setOpenDialog(true);
    };

    const onCloseDialogHandler = () => {
        setOpenDialog(false);
    };

    const onEventClickHandler = (selected) => {
        if (window.confirm(
            `정말 '${selected.event.title}'을 삭제하시겠습니까?`
        )) {
            selected.event.remove();
        }
    };

    const handleSubmit = async (newScheduleData) => {
        try {
            await insertScheduleAPI(newScheduleData);
            alert("일정이 정상적으로 등록되었습니다.");
        } catch (error) {
            console.error("Error submitting schedule data:", error);
            alert("일정 등록에 실패하였습니다.");
        }
        onCloseDialogHandler();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewScheduleData({
            ...newScheduleData,
            [name]: value
        });
    };

    const fetchEvents = async () => {
        try {
            const events = schedules.results.schedule.map(schedule => ({
                title: schedule.skdName,
                start: moment(schedule.skdStartDttm, "YYYY-MM-DD A h:mm").toISOString(),
                end: moment(schedule.skdEndDttm, "YYYY-MM-DD A h:mm").toISOString(),
                id: schedule.skdNo
            }));
            console.log("fetchEvents로 받아오는 event: ", events);
            return events;
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    };

    return (
        <main id="main" className="main">
            {calendarReady && (
                <Box flex="1 1 100%" ml="15px" sx={{ a: { textDecoration: 'none', color: '#444444' } }}>
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
                        events={fetchEvents}
                        buttonText={{
                            today: '오늘',
                            month: '월',
                            week: '주',
                            day: '일',
                            list: '목록'
                        }}
                    />
                </Box>
            )}

            <Dialog open={openDialog} onClose={onCloseDialogHandler}>
                <DialogTitle>일정 등록</DialogTitle>
                <ScheduleForm
                    newScheduleData={newScheduleData}
                    onCloseDialogHandler={onCloseDialogHandler}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                />
            </Dialog>
        </main>
    );
};

export default Calendar;

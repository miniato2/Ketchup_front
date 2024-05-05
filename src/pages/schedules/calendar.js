import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Box, Dialog, DialogTitle } from "@mui/material";
import ScheduleForm from "../../components/form/ScheduleForm";
import { insertScheduleAPI } from "../../apis/ScheduleAPICalls";

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newScheduleData, setNewScheduleData] = useState({
        skdName: "",
        skdStartDttm: "",
        skdEndDttm: "",
        skdLocation: "",
        skdMemo: ""
    });

    const calendarRef = useRef(null);

    const onDateClickHandler = (selected) => {
        setOpenDialog(true);
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
    };

    const onCloseDialogHandler = () => {
        setOpenDialog(false);
    };

    const onEventClickHandler = (selected) => {
        if (window.confirm(
            `정말 '${selected.event.title}'을 삭제하시겠습니까?`
        )
        ) {
            selected.event.remove();
        }
    };

    const handleSubmit = async (newScheduleData) => {
        try {
            console.log("submitting new schedule data: ", newScheduleData);

            await insertScheduleAPI(newScheduleData);
            console.log("API call successful!")
            alert("일정이 정상적으로 등록되었습니다.");

            // FullCalendar 컴포넌트를 참조하여 calendarApi에 액세스
            const calendarApi = calendarRef.current.getApi();
            calendarApi.unselect();

            calendarApi.addEvent({
                title: newScheduleData.skdName,
                start: newScheduleData.skdStartDttm,
                end: newScheduleData.skdEndDttm,
            });

            // 새로운 일정을 현재 이벤트 목록에 추가
            const updatedEvents = [
                ...currentEvents,
                {
                    id: Math.random().toString(), // 임의의 ID 생성
                    title: newScheduleData.skdName,
                    start: newScheduleData.skdStartDttm,
                    end: newScheduleData.skdEndDttm,
                }
            ];

            setCurrentEvents(updatedEvents);

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

    return (
        <main id="main" className="main">
            <Box flex="1 1 100%" ml="15px" sx={{ a: { textDecoration: 'none', color: '#444444' } }}>
                <FullCalendar
                    ref={calendarRef}
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
                    eventsSet={(events) => setCurrentEvents(events)}
                    initialEvents={[
                        { id: "1234", title: "테스트 이벤트 1", date: "2024-05-05" },
                        { id: "4321", title: "테스트 이벤트 2", date: "2024-05-25" },
                        { id: "1456", title: "테스트 이벤트 3", date: "2024-05-19" },
                        { id: "9823", title: "테스트 이벤트 4", date: "2024-05-17" },
                        { id: "0342", title: "테스트 이벤트 5", date: "2024-05-06" }
                    ]}
                    buttonText={{
                        today: '오늘',
                        month: '월',
                        week: '주',
                        day: '일',
                        list: '목록'
                    }}
                />
            </Box>

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

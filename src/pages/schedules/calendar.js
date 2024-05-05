import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { Box } from "@mui/material";
import Header from "../../components/commons/Header";

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);

    const onDateClickHandler = (selected) => {
        const title = prompt("새로운 일정을 입력하세요.");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            });
        }
    };

    const onEventClickHandler = (selected) => {
        if (window.confirm(
            `정말 '${selected.event.title}'을 삭제하시겠습니까?`
        )
        ) {
            selected.event.remove();
        }
    };

    return <Box m="20px">
        <Header title="부서별 일정" subtitle="Full Calendar Interactive Page" />

        <Box flex="1 1 100%" ml="15px">
            <FullCalendar
                height="75vh"
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
                selectMirror={true}
                dayMaxEvents={true}
                select={onDateClickHandler}
                eventClick={onEventClickHandler}
                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                    { id: "1234", title: "All-day event", date: "2024-05-05" },
                    { id: "4321", title: "Timed event", date: "2024-05-25" },
                ]}
            />
        </Box>
    </Box>
};

export default Calendar;
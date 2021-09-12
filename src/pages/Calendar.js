import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { FullCalendar } from "primereact/fullcalendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Calendar as PRCalendar } from "primereact/calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventService } from "../service/EventService";
import { changeEvent, getEvents } from "../redux/actions/calendar";
import { useDispatch, useSelector } from "react-redux";

export const Calendar = () => {
    const [eventDialog, setEventDialog] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(null);
    const [changedEvent, setChangedEvent] = useState({ title: "", start: null, end: null, allDay: null });
    const [events, setEvents] = useState(null);
    const dispatch = useDispatch();
    const { calendarEvents } = useSelector(({ calendar }) => calendar);
  
    const options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: Date.now(),
        header: {
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        editable: false,
        eventClick: (e) => {
            e.jsEvent.preventDefault();
            const { title, start, end, id } = e.event;
            setEventDialog(true);
            setClickedEvent(e.event);
            setChangedEvent({ id, title, start, end, allDay: null });
        },
        eventDrop: function({event}) {
            const { title, start, end, id } = event;
            dispatch(changeEvent(event.id,{ id, title, start, end, allDay: null }));
            
          }
    };

    useEffect(() => {
        dispatch(getEvents());
    }, []);
    useEffect(() => {
        setEvents(calendarEvents);
    }, [calendarEvents]);
    

    const save = () => {
        setEventDialog(false);
        clickedEvent.setProp("title", changedEvent.title);
        clickedEvent.setStart(changedEvent.start);
        clickedEvent.setEnd(changedEvent.end);
        clickedEvent.setAllDay(changedEvent.allDay);
        dispatch(changeEvent(clickedEvent.id, changedEvent));
        setChangedEvent({ title: "", start: null, end: "", allDay: null });
    };

    const reset = () => {
        const { title, start, end } = clickedEvent;
        setChangedEvent({ title, start, end, allDay: null });
    };

    const footer = (
        <>
            <Button type="button" label="Save" icon="pi pi-check" className="p-button-text" onClick={save} />
            <Button type="button" label="Reset" icon="pi pi-refresh" className="p-button-text" onClick={reset} />
        </>
    );

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <FullCalendar events={events} options={options} />

                    <Dialog visible={eventDialog && !!clickedEvent} style={{ width: "450px" }} header="Event Details" footer={footer} modal closable onHide={() => setEventDialog(false)}>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="title">Title</label>
                                <InputText id="title" value={changedEvent.title} onChange={(e) => setChangedEvent({ ...changedEvent, ...{ title: e.target.value } })} required autoFocus />
                            </div>
                            <div className="p-field">
                                <label htmlFor="start">From</label>
                                <PRCalendar id="start" value={changedEvent.start} onChange={(e) => setChangedEvent({ ...changedEvent, ...{ start: e.value } })} showTime appendTo={document.body} />
                            </div>
                            <div className="p-field">
                                <label htmlFor="end">To</label>
                                <PRCalendar id="end" value={changedEvent.end} onChange={(e) => setChangedEvent({ ...changedEvent, ...{ end: e.value } })} showTime appendTo={document.body} />
                            </div>
                            <div className="p-field-checkbox">
                                <Checkbox inputId="allday" name="allday" value="All Day" checked={!!changedEvent.allDay} onChange={(e) => setChangedEvent({ ...changedEvent, ...{ allDay: e.value } })} />
                                <label htmlFor="allday">All Day</label>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

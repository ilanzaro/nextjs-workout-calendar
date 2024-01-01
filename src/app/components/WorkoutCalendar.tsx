import { useMemo } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface WorkoutEvent {
  date: Date;
  title: string;
}
interface EventsCalendarPros {
  events: WorkoutEvent[];
}

const WorkoutCalendar = ({ events = [] }: EventsCalendarPros) => {
  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: WorkoutEvent[] }, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);
  console.log(eventsByDate);

  const currentDate = new Date();
  const startDayOfMonth = startOfMonth(currentDate);
  const endDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: startDayOfMonth,
    end: endDayOfMonth,
  });
  const startDayOfMonthIndex = getDay(startDayOfMonth);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-center">{format(currentDate, "MMM yyyy")}</h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="font-bold text-center">
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDayOfMonthIndex }).map((_, index) => (
          <div key={`${index}`} className="border rounded-md p-2 text-center" />
        ))}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={`border rounded-md p-2 text-center ${
                isToday(day) ? "bg-gray-200" : ""
              }`}
            >
              {format(day, "d")}
              {dayEvents.map((event) => {
                return (
                  <div
                    key={event.title}
                    className="bg-green-500 rounded-md text-gray-900"
                  >
                    {event.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutCalendar;

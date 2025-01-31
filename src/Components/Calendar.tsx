import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import ReminderList, { Reminder } from "./ReminderList";

interface CalendarProps {
  reminders: Reminder[];
  onDayClick: (e: React.MouseEvent, day: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ reminders, onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [currentMonthName, setCurrentMonthName] = useState("");

  useEffect(() => {
    const getDaysInMonth = (year: number, month: number): Date[] => {
      const days: Date[] = [];
      const date = new Date(year, month, 1);
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    };

    setCalendarDays(
      getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
    );
    setCurrentMonthName(
      currentDate.toLocaleString("default", { month: "long" })
    );
  }, [currentDate]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">{currentMonthName}</h1>
        <div className="flex gap-4">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          >
            <FcPrevious />
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
          >
            <FcNext />
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-7 gap-2">
        {calendarDays.map((day) => (
          <li
            key={day.toISOString()}
            className="border p-2 rounded-lg text-center cursor-pointer hover:bg-gray-100"
            onDoubleClick={(e) => onDayClick(e, day)}
          >
            {day.getDate()}
            <ReminderList reminders={reminders} day={day} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;

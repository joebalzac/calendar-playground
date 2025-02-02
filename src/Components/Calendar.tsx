import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import ReminderList, { Reminder } from "./ReminderList";

interface CalendarProps {
  reminders: Reminder[];
  onDayClick: (e: React.MouseEvent, day: Date) => void;
  onReminderClick: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    reminder: Reminder
  ) => void;
  onDeleteReminder: (id: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  reminders,
  onDayClick,
  onReminderClick,
  onDeleteReminder,
}) => {
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

  const handleBackToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-9/12 mx-auto">
      <div className="flex items-end justify-between w-full mb-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          {currentMonthName}
        </h1>
        <div className="flex items-end justify-center gap-6">
          <button onClick={handleBackToday}>
            <h2 className="text-1xl font-medium text-purple-400">
              Back to Today
            </h2>
          </button>
          <button
            className="shadow-md rounded-md bg-purple-100 p-2"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          >
            <FcPrevious />
          </button>
          <button
            className="shadow-md rounded-md bg-purple-100 p-2"
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
      <ul className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-1">
        {calendarDays.map((day) => (
          <div key={day.toISOString()}>
            <li
              className={`w-full h-32 border border-gray-300 rounded-lg p-1 flex flex-col items-center justify-between text-lg transition duration-200 shadow-sm cursor-pointer hover:bg-gray-100 ${
                day.toDateString() === new Date().toDateString()
                  ? "bg-purple-300 text-white font-bold"
                  : "bg-white"
              }`}
              onClick={(e) => onDayClick(e, day)}
            >
              {day.getDate()}
              <ReminderList
                reminders={reminders}
                day={day}
                onReminderClick={onReminderClick}
                onDeleteReminder={onDeleteReminder}
              />
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;

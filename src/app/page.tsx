"use client";

import { ReactNode, useEffect, useState } from "react";
import Modal from "./Components/Modal";

interface Reminder {
  id: number;
  title: string;
  description: string;
  date: number;
}

export default function Home() {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const days: Date[] = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const days = getDaysInMonth(year, month);
    setCalendarDays(days);
    console.log(days);
  }, []);

  const today = new Date();
  const todayString = today.toDateString();

  const handleAddReminders = () => {
    if (newReminder.trim()) {
      const newReminderItem: Reminder = {
        id: Date.now(),
        title: newReminder.trim(),
        description: newReminder.trim(),
        date: selectedDay ? selectedDay?.getTime() : Date.now(),
      };
      setReminders([...reminders, newReminderItem]);
    }
    setNewReminder("");
    setIsModalOpen(false);
  };

  const handleDayClick = (e: React.MouseEvent, day: Date) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width,
    });
    setSelectedDay(day);
    setIsModalOpen(true);
    console.log("this day click is being triggered by this day", day);
  };

  {
    console.log("selected day", selectedDay?.toDateString());
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen w-9/12 mx-auto">
        <ul className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-1">
          {calendarDays.map((day) => (
            <div key={day.toISOString()}>
              <div className="relative">
                <li
                  className={`text-2xl w-full h-40 border-purple-900 shadow-lg cursor-pointer hover:bg-purple-500 hover:shadow-purple-500 hover:text-white rounded-md flex flex-col items-center justify-center ${
                    day.toDateString() === todayString
                      ? "text-red-600 font-semibold"
                      : "text-gray-900"
                  }`}
                  onDoubleClick={(e) => handleDayClick(e, day)}
                >
                  {day.getDate()}
                  {reminders
                    .filter(
                      (reminder) =>
                        new Date(reminder.date).toDateString() ===
                        day.toDateString()
                    )
                    .map((reminder) => (
                      <li className="bg-purple-400 text-white text-sm w-full p-1 list-item my-1">
                        {reminder.title}
                      </li>
                    ))}
                </li>
              </div>
            </div>
          ))}
        </ul>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          position={modalPosition}
        >
          <h2 className="text-md font-semibold text-gray-900">Add Reminder:</h2>
          <h3 className="text-1xl font-medium text-gray-800 mb-1">
            Reminders for {selectedDay?.toDateString()}{" "}
          </h3>
          <input
            value={newReminder}
            type="text"
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Add Reminder"
            className="bg-transparent border-b-2 w-full px-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && newReminder.trim() !== "") {
                handleAddReminders();
                setNewReminder("");
              }
            }}
          />
        </Modal>
      </div>
    </>
  );
}

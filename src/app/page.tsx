"use client";

import { useState } from "react";
import Calendar from "../Components/Calendar";
import ReminderModal from "../Components/ReminderModal";
import { useReminders } from "@/Hooks/useReminders";

export default function Home() {
  const { reminders, newReminder, setNewReminder, addReminder } =
    useReminders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleDayClick = (e: React.MouseEvent, day: Date) => {
    e.preventDefault();
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-9/12 mx-auto">
      <Calendar reminders={reminders} onDayClick={handleDayClick} />

      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddReminder={() => {
          if (selectedDay) {
            addReminder(selectedDay.getTime());
            setIsModalOpen(false);
          }
        }}
        newReminder={newReminder}
        setNewReminder={setNewReminder}
      />
    </div>
  );
}

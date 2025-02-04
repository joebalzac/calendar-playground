"use client";

import { useState } from "react";
import Calendar from "../Components/Calendar";
import ReminderModal from "../Components/ReminderModal";
import { useReminders } from "@/Hooks/useReminders";
import EditReminderModal from "@/Components/EditReminderModal";
import { Reminder } from "@/Components/ReminderList";

export default function Home() {
  const {
    reminders,
    newReminder,
    editReminder,
    setEditReminder,
    setNewReminder,
    addReminder,
    deleteReminder,
    saveReminder,
    handleEditReminder,
  } = useReminders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleDayClick = (e: React.MouseEvent, day: Date) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width,
    });
    setSelectedDay(day);
    if (!isEditModalOpen) {
      setIsModalOpen(true);
    }
  };

  const handleReminderClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    reminder: Reminder
  ) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width,
    });
    setSelectedReminder(reminder);
    setIsEditModalOpen(true);
    console.log("Reminder click is working!");
  };

  const handleSaveReminder = () => {
    saveReminder();
    setEditReminder(editReminder);
    setIsEditModalOpen(false);
    console.log("this is saving", editReminder);
  };

  console.log("Edit Reminder", editReminder);

  return (
    <div className="flex justify-center items-center h-screen w-9/12 mx-auto">
      <Calendar
        reminders={reminders}
        onDayClick={handleDayClick}
        onReminderClick={handleReminderClick}
        onDeleteReminder={deleteReminder}
      />

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
        position={modalPosition}
      />

      <EditReminderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditReminder={() => {
          if (selectedReminder) {
            handleEditReminder(selectedReminder.id, selectedReminder.title);
          }
        }}
        editReminder={editReminder}
        setEditReminder={setEditReminder}
        onSaveReminder={handleSaveReminder}
        position={modalPosition}
        selectedReminder={selectedReminder}
        reminders={reminders}
      />
    </div>
  );
}

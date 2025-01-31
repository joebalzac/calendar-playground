import { useState } from "react";

interface Reminder {
  id: number;
  title: string;
  description: string;
  date: number;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = (date: number) => {
    if (!newReminder.trim()) return;
    const newReminderItem: Reminder = {
      id: Date.now(),
      title: newReminder.trim(),
      description: newReminder.trim(),
      date,
    };
    setReminders([...reminders, newReminderItem]);
    setNewReminder("");
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const updateReminder = (id: number, title: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, title } : reminder
      )
    );
  };

  return {
    reminders,
    newReminder,
    setNewReminder,
    addReminder,
    deleteReminder,
    updateReminder,
  };
}

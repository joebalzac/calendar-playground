import { useState } from "react";

interface Reminder {
  id: number;
  title: string;
  description: string;
  date: number;
}

export const useReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [editReminder, setEditReminder] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
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

  const handleEditReminder = (id: number, title: string) => {
    setEditReminder(title);
    setEditingId(id);
  };

  const saveReminder = () => {
    if (editReminder !== null) {
      setReminders(
        reminders.map((reminder) =>
          reminder.id === editingId
            ? { ...reminder, title: editReminder }
            : reminder
        )
      );
    }
  };

  return {
    reminders,
    newReminder,
    setNewReminder,
    addReminder,
    deleteReminder,
    saveReminder,
    handleEditReminder,
  };
};

import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import { Reminder } from "./ReminderList";

interface EditReminderProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: Reminder[];
  selectedReminder: Reminder | null;
  editReminder: string;
  onEditReminder: (id: number, title: string) => void;
  setEditReminder: (title: string) => void;
  onSaveReminder: () => void;
  position: { top: number; left: number };
}

const EditReminderModal = ({
  isOpen,
  onClose,
  selectedReminder,
  editReminder,
  onEditReminder,
  setEditReminder,
  onSaveReminder,
  position,
}: EditReminderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditReminder = () => {
    if (selectedReminder) {
      setEditReminder(selectedReminder?.title);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} position={position}>
      <h2 className="text-lg font-semibold">Edit Reminder</h2>

      {selectedReminder && (
        <li className="list-none">
          <h3>Current: {selectedReminder.title}</h3>
          <input
            ref={inputRef}
            value={editReminder}
            type="text"
            onChange={(e) => setEditReminder(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={onSaveReminder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSaveReminder();
                }
              }}
            >
              Save
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleEditReminder}
            >
              Edit
            </button>
          </div>
        </li>
      )}
    </Modal>
  );
};

export default EditReminderModal;

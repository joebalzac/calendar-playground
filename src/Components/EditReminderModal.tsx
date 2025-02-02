import React from "react";
import Modal from "./Modal";

interface EditReminderProps {
  isOpen: boolean;
  onClose: () => void;
  onEditReminder: (id: number, title: string) => void;
  setEditReminder: (title: string) => void;
  onSaveReminder: (title: string) => void;
  position: { top: number; left: number };
}

const EditReminderModal = ({
  isOpen,
  onClose,
  onEditReminder,
  setEditReminder,
  onSaveReminder,
  position,
}: EditReminderProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position={position}>
      <h2 className="text-lg font-semibold">Edit Reminder</h2>
      <input type="text" onChange={(e) => setEditReminder(e.target.value)} />
      <button onClick={() => onSaveReminder}>Save</button>
      <button onClick={() => onEditReminder}>Edit</button>
    </Modal>
  );
};

export default EditReminderModal;

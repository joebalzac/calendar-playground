import Modal from "./Modal";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReminder: () => void;
  newReminder: string;
  setNewReminder: (text: string) => void;
  position: { top: number; left: number };
}

const ReminderModal = ({
  isOpen,
  onClose,
  onAddReminder,
  newReminder,
  setNewReminder,
  position,
}: ReminderModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position={position}>
      <h2 className="text-lg font-semibold">Add Reminder</h2>
      <input
        value={newReminder}
        type="text"
        onChange={(e) => setNewReminder(e.target.value)}
        placeholder="Add Reminder"
        className="border-b-2 w-full px-1 cursor-default"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddReminder();
          }
        }}
      />
    </Modal>
  );
};

export default ReminderModal;

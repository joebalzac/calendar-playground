import Modal from "./Modal";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReminder: () => void;
  newReminder: string;
  setNewReminder: (text: string) => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  onAddReminder,
  newReminder,
  setNewReminder,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position={{ top: 0, left: 0 }}>
      <h2 className="text-lg font-semibold">Add Reminder</h2>
      <input
        value={newReminder}
        type="text"
        onChange={(e) => setNewReminder(e.target.value)}
        placeholder="Add Reminder"
        className="border-b-2 w-full px-2"
        onKeyDown={(e) => e.key === "Enter" && onAddReminder()}
      />
    </Modal>
  );
};

export default ReminderModal;

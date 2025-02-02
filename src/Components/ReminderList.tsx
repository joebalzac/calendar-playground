export interface Reminder {
  id: number;
  title: string;
  description: string;
  date: number;
}

interface ReminderListProps {
  reminders: Reminder[];
  day: Date;
  onReminderClick: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    reminder: Reminder
  ) => void;
  onDeleteReminder: (id: number) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({
  reminders,
  day,
  onReminderClick,
  onDeleteReminder,
}) => {
  return (
    <div className="w-full flex flex-col items-start">
      {reminders
        .filter(
          (reminder) =>
            new Date(reminder.date).toDateString() === day.toDateString()
        )
        .map((reminder) => (
          <button
            key={reminder.id}
            onClick={(e) => onReminderClick(e, reminder)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onReminderClick(e, reminder);
              if (e.key === "Backspace") onDeleteReminder(reminder.id);
            }}
            className={`w-full text-white text-xs px-2 py-1 rounded-lg truncate 
              ${
                reminder.id
                  ? "bg-purple-400 hover:bg-purple-700"
                  : "bg-gray-400"
              } 
              text-left my-1 cursor-pointer flex justify-between`}
          >
            {reminder.title}
          </button>
        ))}
    </div>
  );
};

export default ReminderList;

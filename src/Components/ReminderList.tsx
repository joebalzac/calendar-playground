export interface Reminder {
  id: number;
  title: string;
  description: string;
  date: number;
}

interface ReminderListProps {
  reminders: Reminder[];
  day: Date;
}

const ReminderList: React.FC<ReminderListProps> = ({ reminders, day }) => {
  return (
    <div>
      {reminders
        .filter((reminder) => new Date(reminder.date).toDateString() === day.toDateString())
        .map((reminder) => (
          <button
            key={reminder.id}
            className="block bg-purple-400 text-white text-xs px-2 py-1 rounded-lg mt-1 truncate"
          >
            {reminder.title}
          </button>
        ))}
    </div>
  );
};

export default ReminderList;

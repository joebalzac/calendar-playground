"use client";

import { useState } from "react";
import Calendar from "../Components/Calendar";
import ReminderModal from "../Components/ReminderModal";
import { useReminders } from "@/Hooks/useReminders";

export default function Home() {
  const {
    reminders,
    newReminder,
    setNewReminder,
    addReminder,
    deleteReminder,
  } = useReminders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleDayClick = (e: React.MouseEvent, day: Date) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width,
    });
    setSelectedDay(day);
    setIsModalOpen(true);
    console.log("this day click is being triggered by this day", day);
  };

  return (
    <div className="flex justify-center items-center h-screen w-9/12 mx-auto">
      <Calendar
        reminders={reminders}
        onDayClick={handleDayClick}
        onReminderClick={(e) => {
          e.preventDefault();
        }}
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
        onDeleteReminder={deleteReminder}
      />
    </div>
  );
}

// "use client";

// import { ReactNode, useEffect, useState } from "react";
// import Modal from "./Components/Modal";
// import { styleText } from "util";
// import { FcNext, FcPrevious } from "react-icons/fc";

// interface Reminder {
//   id: number;
//   title: string;
//   description: string;
//   date: number;
// }

// export default function Home() {
//   const [calendarDays, setCalendarDays] = useState<Date[]>([]);
//   const [calendarMonths, setCalendarMonths] = useState<Date[]>([]);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [currentMonthName, setCurrentMonthName] = useState("");
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [newReminder, setNewReminder] = useState("");
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
//   const [selectedDay, setSelectedDay] = useState<Date | null>(null);
//   const [isReminderSelected, setIsReminderSelected] = useState<number | null>(
//     null
//   );
//   const [editingId, setEditingId] = useState<Number | null>(null);
//   const [editingText, setEditingText] = useState("");

//   const getDaysInMonth = (year: number, month: number): Date[] => {
//     const days: Date[] = [];
//     const date = new Date(year, month, 1);

//     while (date.getMonth() === month) {
//       days.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }

//     return days;
//   };

//   useEffect(() => {
//     const days = getDaysInMonth(
//       currentDate.getFullYear(),
//       currentDate.getMonth()
//     );
//     setCalendarDays(days);
//     setCurrentMonthName(
//       currentDate.toLocaleString("default", { month: "long" })
//     );
//   }, [currentDate]);

//   const today = new Date();
//   const todayString = today.toDateString();

//   const handleAddReminders = () => {
//     if (newReminder.trim()) {
//       const newReminderItem: Reminder = {
//         id: Date.now(),
//         title: newReminder.trim(),
//         description: newReminder.trim(),
//         date: selectedDay ? selectedDay?.getTime() : Date.now(),
//       };
//       setReminders([...reminders, newReminderItem]);
//     }
//     setNewReminder("");
//     setIsModalOpen(false);
//   };

//   const handleDayClick = (e: React.MouseEvent, day: Date) => {
//     e.preventDefault();
//     const rect = (e.target as HTMLElement).getBoundingClientRect();
//     setModalPosition({
//       top: rect.top + window.scrollY,
//       left: rect.left + rect.width,
//     });
//     setSelectedDay(day);
//     setIsModalOpen(true);
//     console.log("this day click is being triggered by this day", day);
//   };

//   const handleReminderClick = (
//     e:
//       | React.MouseEvent<HTMLButtonElement>
//       | React.KeyboardEvent<HTMLButtonElement>,
//     reminder: Reminder
//   ) => {
//     e.preventDefault();
//     setIsReminderSelected(reminder.id);
//     setIsReminderModalOpen(true);
//   };

//   {
//     console.log("selected day", selectedDay?.toDateString());
//   }

//   const handleDeleteReminder = (id: number) => {
//     setReminders(reminders.filter((reminder) => reminder.id !== id));
//     console.log("this is deleting");
//   };

//   const handleSelectReminder = (id: number) => {
//     setIsReminderSelected(id);
//   };

//   const handleEditReminder = (id: number, title: string) => {
//     setEditingId(id);
//     setEditingText(title);
//   };

//   const handleSaveReminder = () => {
//     if (editingText !== null) {
//       setReminders(
//         reminders.map((reminder) =>
//           reminder.id === editingId
//             ? { ...reminder, title: editingText }
//             : reminder
//         )
//       );
//       setEditingText("");
//     }
//   };

//   const handleNextMonth = () => {
//     setCurrentDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() + 1);
//       return newDate;
//     });
//     console.log("Next month is firing");
//   };

//   const handlePrevMonth = () => {
//     setCurrentDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       newDate.setMonth(newDate.getMonth() - 1);
//       return newDate;
//     });
//   };

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center h-screen w-9/12 mx-auto">
//         <div className="flex items-end justify-between w-full mb-4">
//           <h1 className="text-3xl font-semibold text-gray-900">
//             {currentMonthName}
//           </h1>
//           <div className="flex items-end justify-center gap-32">
//             <button onClick={handlePrevMonth}>
//               <FcPrevious />
//             </button>
//             <button onClick={handleNextMonth}>
//               <FcNext />
//             </button>
//           </div>
//         </div>
//         <ul className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-1">
//           {calendarDays.map((day) => (
//             <div key={day.toISOString()}>
//               <div className="relative">
//                 <li
//                   className={w-full h-32 border border-gray-300 rounded-lg p-2 flex flex-col items-center justify-between text-lg transition duration-200 shadow-sm cursor-pointer hover:bg-gray-100 ${
//                     day.toDateString() === todayString
//                       ? "bg-purple-500 text-white font-bold"
//                       : "bg-white"
//                   }}
//                   onDoubleClick={(e) => handleDayClick(e, day)}
//                 >
//                   {day.getDate()}
//                   {reminders
//                     .filter(
//                       (reminder) =>
//                         new Date(reminder.date).toDateString() ===
//                         day.toDateString()
//                     )
//                     .map((reminder) => (
//                       <button
//                         key={reminder.id}
//                         onClick={() => handleSelectReminder(reminder.id)}
//                         onDoubleClick={(e) => handleReminderClick(e, reminder)}
//                         onKeyDown={(e) => {
//                           if (e.key === "Backspace") {
//                             handleDeleteReminder(reminder.id);
//                           }
//                           if (e.key === "Enter") {
//                             handleReminderClick(e, reminder);
//                           }
//                         }}
//                         tabIndex={0}
//                         className={w-full text-white text-xs px-2 py-1 rounded-lg truncate ${
//                           isReminderSelected === reminder.id
//                             ? "bg-purple-700"
//                             : "bg-purple-400"
//                         }sffssf

//                     text-white text-sm text-left w-full px-1  my-1 cursor-default flex justify-between }
//                       >
//                         {reminder.title}
//                       </button>
//                     ))}
//                 </li>
//               </div>
//             </div>
//           ))}
//         </ul>

//         {isReminderModalOpen === true ? (
//           <div>
//             <Modal
//               isOpen={isReminderModalOpen}
//               onClose={() => setIsReminderModalOpen(false)}
//               position={modalPosition}
//             >
//               {reminders.map((reminder) =>
//                 selectedDay && reminder.id === isReminderSelected ? (
//                   <div key={reminder.id}>
//                     {reminder.title}
//                     <div className="Flex items-center justify-between gap-6">
//                       <button
//                         className="border-gray-900 border-2 text-gray-900 rounded-md py-1 px-4"
//                         onClick={() =>
//                           handleEditReminder(reminder.id, reminder.title)
//                         }
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="border-red-600 border-2 text-red-600 rounded-md py-1 px-4"
//                         onClick={handleSaveReminder}
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 ) : null
//               )}
//               <input
//                 type="text"
//                 value={editingText}
//                 onChange={(e) => setEditingText(e.target.value)}
//               />
//             </Modal>
//           </div>
//         ) : (
//           <div>
//             <Modal
//               isOpen={isModalOpen}
//               onClose={() => setIsModalOpen(false)}
//               position={modalPosition}
//             >
//               <h2 className="text-md font-semibold text-gray-900">
//                 Add Reminder:
//               </h2>
//               <h3 className="text-1xl font-medium text-gray-800 mb-1">
//                 Reminders for {selectedDay?.toDateString()}{" "}
//               </h3>
//               <input
//                 value={newReminder}
//                 type="text"
//                 onChange={(e) => setNewReminder(e.target.value)}
//                 placeholder="Add Reminder"
//                 className="bg-transparent border-b-2 w-full px-2"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && newReminder.trim() !== "") {
//                     handleAddReminders();
//                     setNewReminder("");
//                   }
//                 }}
//               />
//             </Modal>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

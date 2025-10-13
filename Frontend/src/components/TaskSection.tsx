import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressPie from "./ProgressPie";

type Task = {
  title: string;
  dueDate: string;
  tag: string;
  priority: "High" | "Mid" | "Low";
  progress: number;
};

type SectionProps = {
  title: string;
  tasks: Task[];
  onUpdateTask: (index: number, updatedTask: Task) => void;
  onCheckboxChange?: (index: number) => void;
};

export default function TaskSection({ title, tasks, onUpdateTask, onCheckboxChange }: SectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingDate, setEditingDate] = useState<Date | null>(null);

  const handleDateClick = (index: number, currentDate: string) => {
    setEditingIndex(index);
    const parsedDate = new Date(currentDate);
    setEditingDate(isNaN(parsedDate.getTime()) ? null : parsedDate);
  };

  const handleDateChange = (date: Date | null) => {
    if (editingIndex !== null && date) {
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const updatedTask = { ...tasks[editingIndex], dueDate: formattedDate };
      onUpdateTask(editingIndex, updatedTask);
      setEditingIndex(null);
      setEditingDate(null);
    }
  };

  return (
    <div className="bg-white max-w-screen p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th></th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Task Tags</th>
            <th>Priority</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i} className="bg-gray-50 hover:bg-gray-100 transition">
              <td className="py-2 px-2">
                <input
                  type="checkbox"
                  checked={title === "Done"}
                  disabled={title === "Done"}
                  onChange={() => onCheckboxChange && onCheckboxChange(i)}
                />
              </td>
              <td className="py-2 px-2">{task.title}</td>
              <td className="py-2 px-2 flex items-center gap-2">
                {editingIndex === i ? (
                  <DatePicker
                    selected={editingDate}
                    onChange={handleDateChange}
                    onBlur={() => setEditingIndex(null)}
                    className="w-20 p-1 border rounded text-sm"
                    dateFormat="MMM dd"
                    autoFocus
                  />
                ) : (
                  <span
                    className="text-indigo-500 cursor-pointer hover:text-indigo-700"
                    onClick={() => handleDateClick(i, task.dueDate)}
                  >
                    📅 {task.dueDate}
                  </span>
                )}
              </td>
              <td className="py-2 px-2">
                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
                  {task.tag}
                </span>
              </td>
              <td className="py-2 px-2">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Mid"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-2 px-2 flex items-center gap-2">
                <ProgressPie progress={task.progress} />
                <select
                  value={task.progress}
                  onChange={(e) => {
                    const updatedTask = { ...task, progress: parseInt(e.target.value) };
                    onUpdateTask(i, updatedTask);
                  }}
                  className="text-xs border rounded-lg px-1 py-0.5"
                >
                  <option value={0}>0%</option>
                  <option value={25}>25%</option>
                  <option value={50}>50%</option>
                  <option value={75}>75%</option>
                  <option value={100}>100%</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

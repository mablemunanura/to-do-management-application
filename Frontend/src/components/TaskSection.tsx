import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressPie from "./ProgressPie";
import { Pen, Check, Trash2 } from "lucide-react";

type Task = {
  id: number;
  title: string;
  dueDate: string;
  tag: string;
  priority: "High" | "Mid" | "Low";
  progress: number;
  status: string;
};

type SectionProps = {
  title: string;
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onCheckboxChange?: (task: Task) => void;
  onDelete: (taskId: number) => void;
};

export default function TaskSection({ title, tasks, onUpdateTask, onCheckboxChange, onDelete }: SectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingDate, setEditingDate] = useState<Date | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDateClick = (index: number, currentDate: string) => {
    setEditingIndex(index);
    setEditingDate(new Date(currentDate));
  };

  return (
    <div className="bg-white max-w-screen p-4 md:p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task, i) => (
          <div key={i} className="bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl shadow-sm relative">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-lg md:text-base flex-1">
                {editingTask && editingIndex === i ? (
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                    autoFocus
                  />
                ) : (
                  task.title
                )}
              </h3>
              <span className="ml-2">
                {editingTask && editingIndex === i ? (
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as "High" | "Mid" | "Low" })}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="High">High</option>
                    <option value="Mid">Mid</option>
                    <option value="Low">Low</option>
                  </select>
                ) : (
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
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <input
                type="checkbox"
                checked={title === "Done"}
                disabled={title === "Done"}
                onChange={() => onCheckboxChange && onCheckboxChange(task)}
                className="w-4 h-4"
              />
              <span>
                {editingTask && editingIndex === i ? (
                  <input
                    type="text"
                    value={editingTask.tag}
                    onChange={(e) => setEditingTask({ ...editingTask, tag: e.target.value })}
                    className="w-20 p-1 border rounded text-sm"
                  />
                ) : (
                  <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
                    {task.tag}
                  </span>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <ProgressPie progress={task.progress} />
                <select
                  value={task.progress}
                  onChange={(e) => {
                    const updatedTask = { ...task, progress: parseInt(e.target.value) };
                    onUpdateTask(updatedTask);
                  }}
                  className="text-xs border rounded-lg px-2 py-1"
                >
                  <option value={0}>0%</option>
                  <option value={25}>25%</option>
                  <option value={50}>50%</option>
                  <option value={75}>75%</option>
                  <option value={100}>100%</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                {editingTask && editingIndex === i ? (
                  <button
                    onClick={() => {
                      onUpdateTask(editingTask);
                      setEditingTask(null);
                      setEditingIndex(null);
                    }}
                    className="text-green-500 hover:text-green-700 p-1"
                  >
                    <Check size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingTask({ ...task });
                      setEditingIndex(i);
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    <Pen size={18} />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this task?")) {
                      onDelete(task.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="absolute bottom-2 right-2">
              <span className="flex items-center gap-1 text-sm text-gray-600">
                {editingTask && editingIndex === i ? (
                  <DatePicker
                    selected={editingDate}
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = date.toISOString().split('T')[0];
                        setEditingTask({ ...editingTask, dueDate: formattedDate });
                      }
                    }}
                    className="w-24 p-1 border rounded text-sm"
                    dateFormat="MMM dd"
                  />
                ) : (
                  <span
                    className="text-indigo-500 cursor-pointer hover:text-indigo-700"
                    onClick={() => handleDateClick(i, task.dueDate)}
                  >
                    📅 {task.dueDate}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2 min-w-[600px]">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th></th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Task Tags</th>
              <th>Priority</th>
              <th>Progress</th>
              <th>Edit</th>
              <th>Delete</th>
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
                    onChange={() => onCheckboxChange && onCheckboxChange(task)}
                  />
                </td>
                <td className="py-2 px-2">
                  {editingTask && editingIndex === i ? (
                    <input
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      className="w-full p-1 border rounded text-sm"
                      autoFocus
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td className="py-2 px-2 flex items-center gap-2">
                {editingTask && editingIndex === i ? (
                  <DatePicker
                    selected={editingDate}
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = date.toISOString().split('T')[0];
                        setEditingTask({ ...editingTask, dueDate: formattedDate });
                      }
                    }}
                    className="w-20 p-1 border rounded text-sm"
                    dateFormat="MMM dd"
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
                  {editingTask && editingIndex === i ? (
                    <input
                      type="text"
                      value={editingTask.tag}
                      onChange={(e) => setEditingTask({ ...editingTask, tag: e.target.value })}
                      className="w-full p-1 border rounded text-sm"
                    />
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
                      {task.tag}
                    </span>
                  )}
                </td>
                <td className="py-2 px-2">
                  {editingTask && editingIndex === i ? (
                    <select
                      value={editingTask.priority}
                      onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as "High" | "Mid" | "Low" })}
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="High">High</option>
                      <option value="Mid">Mid</option>
                      <option value="Low">Low</option>
                    </select>
                  ) : (
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
                  )}
                </td>
                <td className="py-2 px-2 flex items-center gap-2">
                  <ProgressPie progress={task.progress} />
                  <select
                    value={task.progress}
                    onChange={(e) => {
                      const updatedTask = { ...task, progress: parseInt(e.target.value) };
                      onUpdateTask(updatedTask);
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
                <td className="py-2 px-2">
                  {editingTask && editingIndex === i ? (
                    <button
                      onClick={() => {
                        onUpdateTask(editingTask);
                        setEditingTask(null);
                        setEditingIndex(null);
                      }}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTask({ ...task });
                        setEditingIndex(i);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Pen size={16} />
                    </button>
                  )}
                </td>
                <td className="py-2 px-2">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this task?")) {
                        onDelete(task.id);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

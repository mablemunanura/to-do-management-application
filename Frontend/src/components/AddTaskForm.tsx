import { useState } from "react";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type AddTaskFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { title: string; dueDate: string; tag: string; priority: "High" | "Mid" | "Low"; progress: number; id?: number; status?: string }) => void;
};

export default function AddTaskForm({ isOpen, onClose, onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [tag, setTag] = useState("");
  const [priority, setPriority] = useState<"High" | "Mid" | "Low">("Mid");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && dueDate && tag) {
      const isoDate = dueDate.toISOString().split('T')[0];
      onAddTask({ title, dueDate: isoDate, tag, priority, progress: 0 });
      setTitle("");
      setDueDate(new Date());
      setTag("");
      setPriority("Mid");
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="w-full p-2 border rounded"
              placeholderText="Select a date"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., Work"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "High" | "Mid" | "Low")}
              className="w-full p-2 border rounded"
            >
              <option value="High">High</option>
              <option value="Mid">Mid</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

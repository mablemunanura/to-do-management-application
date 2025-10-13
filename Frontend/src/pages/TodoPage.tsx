import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskSection from "../components/TaskSection";
import AddTaskForm from "../components/AddTaskForm";

type Task = {
  title: string;
  dueDate: string;
  tag: string;
  priority: "High" | "Mid" | "Low";
  progress: number; // 0-100
};

export default function ToDo() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([
    { title: "Website Development", dueDate: "16 Oct", tag: "Work", priority: "High", progress: 0 },
    { title: "UI/UX refinement", dueDate: "18 Oct", tag: "Work", priority: "Mid", progress: 0 },
  ]);

  const [inProgress, setInProgress] = useState<Task[]>([
    { title: "Respond to work emails", dueDate: "16 Oct", tag: "Work", priority: "High", progress: 50 },
    { title: "Apply for leave", dueDate: "18 Oct", tag: "Work", priority: "Mid", progress: 75 },
  ]);

  const [done, setDone] = useState<Task[]>([
    { title: "Book medical appointment", dueDate: "16 Oct", tag: "Health", priority: "High", progress: 100 },
    { title: "Update LinkedIn profile", dueDate: "18 Oct", tag: "Work", priority: "Low", progress: 100 },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddTask = (newTask: Task) => {
    setTodoTasks([...todoTasks, newTask]);
  };

  const handleUpdateTask = (section: string, index: number, updatedTask: Task) => {
    if (section === "To Do") {
      const newTasks = [...todoTasks];
      newTasks[index] = updatedTask;
      setTodoTasks(newTasks);
    } else if (section === "In Progress") {
      const newTasks = [...inProgress];
      newTasks[index] = updatedTask;
      setInProgress(newTasks);
    } else if (section === "Done") {
      const newTasks = [...done];
      newTasks[index] = updatedTask;
      setDone(newTasks);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen min-w-screen">
      <Sidebar />
      <div className="flex-1 p-8 max-w-screen">
        <Header />
        <div className="space-y-6 max-w-screen">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold mb-3">My Tasks</h1> 
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-xl px-6 py-2 flex items-center justify-center shadow-lg"
            >
              Add
            </button>
          </div>

          <TaskSection title="To Do" tasks={todoTasks} onUpdateTask={(index, task) => handleUpdateTask("To Do", index, task)} />
          <TaskSection title="In Progress" tasks={inProgress} onUpdateTask={(index, task) => handleUpdateTask("In Progress", index, task)} />
          <TaskSection title="Done" tasks={done} onUpdateTask={(index, task) => handleUpdateTask("Done", index, task)} />
        </div>
      </div>
      <AddTaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onAddTask={handleAddTask} 
      />
    </div>
  );
}

import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskSection from "../components/TaskSection";
import AddTaskForm from "../components/AddTaskForm";
import { Plus } from "lucide-react";



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

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ priorities: [] as string[], tags: [] as string[] });

  const handleAddTask = (newTask: Omit<Task, 'progress'>) => {
    setTodoTasks([...todoTasks, { ...newTask, progress: 0 }]);
  };

  const allTasks = [...todoTasks, ...inProgress, ...done];
  const availableTags = Array.from(new Set(allTasks.map(task => task.tag)));

  const filteredTasks = (tasks: Task[]) => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply priority filter
    if (filters.priorities.length > 0) {
      filtered = filtered.filter(task => filters.priorities.includes(task.priority));
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(task => filters.tags.includes(task.tag));
    }

    return filtered;
  };



  const handleCheckboxChange = (section: string, index: number) => {
    let taskToMove: Task;
    if (section === "To Do") {
      taskToMove = { ...todoTasks[index], progress: 100 };
      setTodoTasks(todoTasks.filter((_, i) => i !== index));
      setDone([...done, taskToMove]);
    } else if (section === "In Progress") {
      taskToMove = { ...inProgress[index], progress: 100 };
      setInProgress(inProgress.filter((_, i) => i !== index));
      setDone([...done, taskToMove]);
    }
  };

  const handleUpdateTask = (section: string, index: number, updatedTask: Task) => {
    let taskToMove: Task | undefined;
    let targetSection: string;

    if (updatedTask.progress === 0) {
      targetSection = "To Do";
    } else if (updatedTask.progress === 100) {
      targetSection = "Done";
    } else {
      targetSection = "In Progress";
    }

    if (targetSection !== section) {
      // Move task to new section
      if (section === "To Do") {
        taskToMove = updatedTask;
        setTodoTasks(todoTasks.filter((_, i) => i !== index));
      } else if (section === "In Progress") {
        taskToMove = updatedTask;
        setInProgress(inProgress.filter((_, i) => i !== index));
      } else if (section === "Done") {
        taskToMove = updatedTask;
        setDone(done.filter((_, i) => i !== index));
      }

      if (taskToMove) {
        if (targetSection === "To Do") {
          setTodoTasks([...todoTasks, taskToMove]);
        } else if (targetSection === "In Progress") {
          setInProgress([...inProgress, taskToMove]);
        } else if (targetSection === "Done") {
          setDone([...done, taskToMove]);
        }
      }
    } else {
      // Update in place
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
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen min-w-screen">
      <div className="fixed left-0 top-0 h-full md:block hidden">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-60 p-4 md:p-8 max-w-screen overflow-y-auto">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterChange={setFilters}
          availableTags={availableTags}
        />
        <div className="space-y-6 max-w-screen">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-lg font-bold">My Tasks</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white hover:bg-gray-50 text-blue-600 text-xl font-bold rounded-full px-6 py-1 flex items-center justify-center shadow-lg border-2 border-blue-600 w-full md:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Add
            </button>
          </div>

          <TaskSection title="To Do" tasks={filteredTasks(todoTasks)} onUpdateTask={(index, task) => handleUpdateTask("To Do", index, task)} onCheckboxChange={(index) => handleCheckboxChange("To Do", index)} />
          <TaskSection title="In Progress" tasks={filteredTasks(inProgress)} onUpdateTask={(index, task) => handleUpdateTask("In Progress", index, task)} onCheckboxChange={(index) => handleCheckboxChange("In Progress", index)} />
          <TaskSection title="Done" tasks={filteredTasks(done)} onUpdateTask={(index, task) => handleUpdateTask("Done", index, task)} />
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

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskSection from "../components/TaskSection";
import AddTaskForm from "../components/AddTaskForm";
import { Plus } from "lucide-react";

type Task = {
  id: number;
  title: string;
  dueDate: string;
  tag: string;
  priority: "High" | "Mid" | "Low";
  progress: number; // 0-100
  status: string;
};

export default function ToDo() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ priorities: [] as string[], tags: [] as string[] });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks');
      const tasks = await response.json();
      const formattedTasks = tasks.map((task: { id: number; title: string; due_date: string; tag: string; priority: string; progress: number; status: string }) => ({
        id: task.id,
        title: task.title,
        dueDate: task.due_date,
        tag: task.tag,
        priority: task.priority as "High" | "Mid" | "Low",
        progress: task.progress,
        status: task.status,
      }));
      setTodoTasks(formattedTasks.filter((task: Task) => task.status === 'To Do'));
      setInProgress(formattedTasks.filter((task: Task) => task.status === 'In Progress'));
      setDone(formattedTasks.filter((task: Task) => task.status === 'Done'));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'status'>) => {
    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask.title,
          due_date: newTask.dueDate,
          tag: newTask.tag,
          priority: newTask.priority,
          status: 'To Do',
          progress: 0,
        }),
      });
      if (response.ok) {
        fetchTasks();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
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

    // Sort by due date in ascending order
    filtered = filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    return filtered;
  };



  const handleCheckboxChange = async (section: string, task: Task) => {
    const updatedTask = { ...task, progress: 100, status: 'Done' };
    await updateTask(updatedTask);
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: task.title,
          due_date: task.dueDate,
          tag: task.tag,
          priority: task.priority,
          status: task.status,
          progress: task.progress,
        }),
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleUpdateTask = async (section: string, updatedTask: Task) => {
    let targetStatus: string;

    if (updatedTask.progress === 0) {
      targetStatus = "To Do";
    } else if (updatedTask.progress === 100) {
      targetStatus = "Done";
    } else {
      targetStatus = "In Progress";
    }

    const taskToUpdate = { ...updatedTask, status: targetStatus };
    await updateTask(taskToUpdate);
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen min-w-screen">
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
          onClearFilters={() => {
            setFilters({ priorities: [], tags: [] });
            setSearchQuery("");
          }}
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

          <TaskSection title="To Do" tasks={filteredTasks(todoTasks)} onUpdateTask={(task) => handleUpdateTask("To Do", task)} onCheckboxChange={(task) => handleCheckboxChange("To Do", task)} onDelete={(taskId) => handleDeleteTask(taskId)} />
          <TaskSection title="In Progress" tasks={filteredTasks(inProgress)} onUpdateTask={(task) => handleUpdateTask("In Progress", task)} onCheckboxChange={(task) => handleCheckboxChange("In Progress", task)} onDelete={(taskId) => handleDeleteTask(taskId)} />
          <TaskSection title="Done" tasks={filteredTasks(done)} onUpdateTask={(task) => handleUpdateTask("Done", task)} onDelete={(taskId) => handleDeleteTask(taskId)} />
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

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Sidebar from "../components/Sidebar";
import AddTaskForm from "../components/AddTaskForm";
import { Calendar as CalendarIcon, Clock, Tag, AlertTriangle, Plus } from "lucide-react";

type Task = {
  id: number;
  title: string;
  dueDate: string;
  tag: string;
  priority: "High" | "Mid" | "Low";
  progress: number;
  status: string;
};

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateString);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const tasksForDate = getTasksForDate(date);
      if (tasksForDate.length > 0) {
        return (
          <div className="flex flex-col items-center mt-1">
            {tasksForDate.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className={`w-3 h-3 rounded-full mb-1 shadow-sm ${
                  task.priority === 'High' ? 'bg-red-500' :
                  task.priority === 'Mid' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                title={task.title}
              />
            ))}
            {tasksForDate.length > 3 && (
              <span className="text-xs text-indigo-600 font-semibold">+{tasksForDate.length - 3}</span>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  const handleAddTask = async (newTask: Omit<Task, 'progress' | 'id' | 'status'>) => {
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

  return (
    <div className="flex bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen min-w-screen">
      <div className="fixed left-0 top-0 h-full md:block hidden">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-60 p-4 md:p-8 max-w-screen overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <CalendarIcon className="text-indigo-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Calendar View</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <Calendar
                onChange={(value) => setSelectedDate(value as Date)}
                value={selectedDate}
                tileContent={tileContent}
                className="w-full border-none"
              />
            </div>
          </div>
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-indigo-600" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">
                  Tasks for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
              </div>
              {selectedDateTasks.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedDateTasks.map(task => (
                    <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' :
                          task.priority === 'Mid' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Tag size={14} />
                          {task.tag}
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle size={14} />
                          {task.status}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{task.progress}% complete</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto text-gray-300 mb-2" size={48} />
                  <p className="text-gray-500">No tasks scheduled for this date.</p>
                  <p className="text-sm text-gray-400 mt-1 mb-4">Add some tasks to see them here!</p>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-blue-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Task
                  </button>
                </div>
              )}
            </div>
          </div>
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

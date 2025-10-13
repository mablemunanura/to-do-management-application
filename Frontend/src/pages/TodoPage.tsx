import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskSection from "../components/TaskSection";

export default function ToDo() {
  const todoTasks = [
    { title: "Website Development", dueDate: "16 Oct", tag: "Work", priority: "High" },
    { title: "UI/UX refinement", dueDate: "18 Oct", tag: "Work", priority: "Mid" },
  ] as const;

  const inProgress = [
    { title: "Respond to work emails", dueDate: "16 Oct", tag: "Work", priority: "High" },
    { title: "Apply for leave", dueDate: "18 Oct", tag: "Work", priority: "Mid" },
  ] as const;

  const done = [
    { title: "Book medical appointment", dueDate: "16 Oct", tag: "Health", priority: "High" },
    { title: "Update LinkedIn profile", dueDate: "18 Oct", tag: "Work", priority: "Low" },
  ] as const;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <Header />
        <div className="space-y-6">
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          <TaskSection title="To Do" tasks={todoTasks} />
          <TaskSection title="In Progress" tasks={inProgress} />
          <TaskSection title="Done" tasks={done} />
        </div>
      </div>
    </div>
  );
}

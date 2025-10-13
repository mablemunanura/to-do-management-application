import { Calendar, CheckSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="bg-indigo-700 text-white w-60 h-screen flex flex-col p-6 rounded-r-2xl">
      <div>
        <h1 className="text-3xl font-bold mb-8 text-center">TMA</h1>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-indigo-600 rounded-xl cursor-pointer">
            <CheckSquare size={20} />
            <span className="font-medium">Tasks</span>
          </div>
          <div className="flex items-center gap-3 p-3 hover:bg-indigo-600 rounded-xl cursor-pointer">
            <Calendar size={20} />
            <span className="font-medium">Calendar</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

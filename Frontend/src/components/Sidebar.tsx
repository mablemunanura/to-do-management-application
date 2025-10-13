import { Calendar, CheckSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="bg-indigo-700 text-white h-screen flex flex-col rounded-r-2xl md:w-60 w-16 p-4 md:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>TMA</h1>
        <nav className="space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-indigo-600 rounded-xl cursor-pointer w-full">
            <CheckSquare size={20} />
            <span className="font-medium hidden md:inline">Tasks</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 p-3 hover:bg-indigo-600 rounded-xl cursor-pointer w-full">
            <Calendar size={20} />
            <span className="font-medium hidden md:inline">Calendar</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

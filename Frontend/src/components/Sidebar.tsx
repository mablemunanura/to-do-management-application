import { Calendar, CheckSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-[#452993] text-white h-screen flex flex-col rounded-r-2xl md:w-60 w-16 p-4 md:p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>TMA</h1>
        <nav className="space-y-4">
          <Link to="/" className={`flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl cursor-pointer w-full ${location.pathname === '/' ? 'bg-indigo-600' : 'hover:bg-indigo-600'}`}>
            <CheckSquare size={20} className="text-white"/>
            <span className="font-medium hidden md:inline text-white">Tasks</span>
          </Link>
          <Link to="/calendar" className={`flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl cursor-pointer w-full ${location.pathname === '/calendar' ? 'bg-indigo-600' : 'hover:bg-indigo-600'}`}>
            <Calendar size={20} className="text-white"/>
            <span className="font-medium hidden md:inline text-white">Calendar</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

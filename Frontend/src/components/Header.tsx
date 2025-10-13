import { Search } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between w-max-screen items-center bg-white shadow-sm rounded-xl px-6 py-3 mb-6">
      <div className="relative w-1/2">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search for tasks ..."
          className="w-full pl-9 pr-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full w-10 h-10"
        />
        <div>
          <p className="text-sm font-semibold">Mable Tusiime</p>
          <p className="text-xs text-gray-500">mablemunanura@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

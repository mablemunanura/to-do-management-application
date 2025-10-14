import { useState } from "react";
import { Search, Filter, ChevronDown, X, RotateCcw } from "lucide-react";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: { priorities: string[]; tags: string[] };
  onFilterChange: (filters: { priorities: string[]; tags: string[] }) => void;
  availableTags: string[];
  onClearFilters: () => void;
};

export default function Header({ searchQuery, onSearchChange, filters, onFilterChange, availableTags, onClearFilters }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePriorityChange = (priority: string) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority];
    onFilterChange({ ...filters, priorities: newPriorities });
  };

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full items-center bg-white shadow-sm rounded-xl px-4 md:px-6 py-3 mb-6 gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for tasks ..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9 py-2 w-full md:w-80 border rounded-xl text-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {searchQuery && (
            <span title="Clear search">
              <X
                size={16}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => onSearchChange("")}
              />
            </span>
          )}
        </div>
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            title="Filter tasks"
          >
            <Filter size={18} />
            <ChevronDown size={16} />
          </button>
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            title="Clear filters"
          >
            <RotateCcw size={18} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-4 z-10 min-w-64">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filter Tasks</h3>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mb-4">
                <h4 className="text-blue-600 font-semibold mb-2">Priority</h4>
                <div className="space-y-1">
                  {["High", "Mid", "Low"].map(priority => (
                    <label key={priority} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={filters.priorities.includes(priority)}
                        onChange={() => handlePriorityChange(priority)}
                        className="mr-2"
                      />
                      {priority}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-blue-600 font-semibold mb-2">Tags</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {availableTags.map(tag => (
                    <label key={tag} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        className="mr-2"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  onClearFilters();
                  setIsDropdownOpen(false);
                }}
                className="w-full bg-transparent text-blue py-2 rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

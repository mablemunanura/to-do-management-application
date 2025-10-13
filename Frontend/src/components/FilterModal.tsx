import { useState, useEffect } from "react";
import { X } from "lucide-react";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { priorities: string[]; tags: string[] }) => void;
  availableTags: string[];
  initialFilters: { priorities: string[]; tags: string[] };
};

export default function FilterModal({ isOpen, onClose, onApply, availableTags, initialFilters }: FilterModalProps) {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(initialFilters.priorities);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialFilters.tags);

  useEffect(() => {
    setSelectedPriorities(initialFilters.priorities);
    setSelectedTags(initialFilters.tags);
  }, [initialFilters]);

  const handlePriorityChange = (priority: string) => {
    setSelectedPriorities(prev =>
      prev.includes(priority) ? prev.filter(p => p !== priority) : [...prev, priority]
    );
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleApply = () => {
    onApply({ priorities: selectedPriorities, tags: selectedTags });
    onClose();
  };

  const handleClear = () => {
    setSelectedPriorities([]);
    setSelectedTags([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filter Tasks</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Priority</h3>
          <div className="space-y-2">
            {["High", "Mid", "Low"].map(priority => (
              <label key={priority} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPriorities.includes(priority)}
                  onChange={() => handlePriorityChange(priority)}
                  className="mr-2"
                />
                {priority}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {availableTags.map(tag => (
              <label key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="mr-2"
                />
                {tag}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear All
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

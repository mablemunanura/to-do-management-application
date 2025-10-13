import { CalendarDays, SquareCheck } from "lucide-react";

type TaskItemProps = {
  title: string;
  dueDate: string;
  tag: string;
  priority: "High" | "Mid" | "Low";
};

export default function TaskItem({ title, dueDate, tag, priority }: TaskItemProps) {
  const priorityColors: Record<string, string> = {
    High: "bg-red-100 text-red-600",
    Mid: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <tr className="border-t bg-gray-50">
      <td>
        <SquareCheck size={16} />
      </td>
      <td className="py-2">
        <input type="checkbox" className="mr-2" /> {title}
      </td>
      <td className="py-2 flex items-center gap-1 text-sm text-gray-600">
        <CalendarDays size={16} /> {dueDate}
      </td>
      <td className="py-2">
        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          {tag}
        </span>
      </td>
      <td className="py-2">
        <span className={`text-xs px-3 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
      </td>
    </tr>
  );
}

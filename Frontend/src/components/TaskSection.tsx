type SectionProps = {
  title: string;
  tasks: readonly{
    title: string;
    dueDate: string;
    tag: string;
    priority: "High" | "Mid" | "Low" ;
  }[];
};

export default function TaskSection({ title, tasks }: SectionProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>Task</th>
            <th>Due Date</th>
            <th>Task Tags</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i} className="bg-gray-50 hover:bg-gray-100 transition">
              <td className="py-2 px-2">{task.title}</td>
              <td className="py-2 px-2 flex items-center gap-2">
                <span className="text-indigo-500">📅</span> {task.dueDate}
              </td>
              <td className="py-2 px-2">
                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
                  {task.tag}
                </span>
              </td>
              <td className="py-2 px-2">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Mid"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

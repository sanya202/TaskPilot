import TaskCard from "../components/TaskCard";
import { CheckSquare, Clock, ListTodo, AlertCircle } from "lucide-react";

function Dashboard() {
  return (
    <div>
      <h1
        className="
        text-3xl
        font-bold
        mb-8
      "
      >
        Dashboard
      </h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
      >
        <TaskCard title="Total Tasks" value="12" icon={<ListTodo />} />

        <TaskCard title="Pending" value="7" icon={<Clock />} />

        <TaskCard title="Completed" value="5" icon={<CheckSquare />} />

        <TaskCard title="High Priority" value="3" icon={<AlertCircle />} />
      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        mt-8
        p-6
      "
      >
        <h2
          className="
          text-xl
          font-semibold
          mb-4
        "
        >
          Recent Tasks
        </h2>

        <p className="text-gray-500">
          Your latest AI generated tasks will appear here.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import { CheckSquare, Clock, ListTodo, AlertCircle } from "lucide-react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks/${user._id}`);

        // console.log("TASK RESPONSE:", res.data);

        // setTasks(res.data.tasks);

        console.log("DASHBOARD TASK RESPONSE:", res.data);
        console.log("DASHBOARD TASK ARRAY:", res.data.tasks);

        setTasks(res.data.tasks || []);
      } catch (err) {
        console.log("FETCH TASK ERROR:", err);
      }
    };

    fetchTasks();
  }, [user]);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High",
  ).length;

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
        <TaskCard title="Total Tasks" value={totalTasks} icon={<ListTodo />} />

        <TaskCard title="Pending" value={pendingTasks} icon={<Clock />} />

        <TaskCard
          title="Completed"
          value={completedTasks}
          icon={<CheckSquare />}
        />

        <TaskCard
          title="High Priority"
          value={highPriorityTasks}
          icon={<AlertCircle />}
        />
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

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks created yet.</p>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task._id}
                className="
                      border
                      rounded-lg
                      p-4
                      flex
                      justify-between
                    "
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>

                  <p className="text-sm text-gray-500">
                    {task.status} • {task.priority}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

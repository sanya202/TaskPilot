import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${user._id}`);

      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const completeTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, {
        status: "Completed",
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className="
        flex
        justify-between
        items-center
        mb-8
      "
      >
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          My Tasks
        </h1>

        <button
          className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          Create Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="
                bg-white
                rounded-xl
                shadow
                p-5
                flex
                justify-between
                items-center
              "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                "
              >
                {task.title}
              </h2>

              <p className="text-gray-500">{task.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{task.priority}</p>

                <p className="text-gray-500 text-sm">{task.status}</p>
              </div>

              {task.status !== "Completed" && (
                <button
                  onClick={() => completeTask(task._id)}
                  className="
                        bg-green-500
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                >
                  Complete
                </button>
              )}

              <button
                onClick={() => deleteTask(task._id)}
                className="
                    bg-red-500
                    text-white
                    px-3
                    py-2
                    rounded-lg
                  "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;

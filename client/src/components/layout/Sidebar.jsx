import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Bot,
  Workflow,
  User,
} from "lucide-react";

function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <CheckSquare size={20} />,
    },
    {
      name: "AI Assistant",
      path: "/chat",
      icon: <Bot size={20} />,
    },
    {
      name: "Workflows",
      path: "/workflows",
      icon: <Workflow size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <div
      className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-6
    "
    >
      <h1
        className="
        text-2xl
        font-bold
        text-blue-400
        mb-8
      "
      >
        TaskPilot AI
      </h1>

      <div className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                transition
                ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}
                `
            }
          >
            {link.icon}

            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

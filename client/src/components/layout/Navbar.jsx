import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);

    navigate("/");
  };

  return (
    <div
      className="
      h-16
      bg-white
      border-b
      flex
      items-center
      justify-between
      px-8
    "
    >
      <div>
        <h2
          className="
          text-xl
          font-semibold
        "
        >
          Welcome back, {user?.name || "User"} 👋
        </h2>
      </div>

      <button
        onClick={logout}
        className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;

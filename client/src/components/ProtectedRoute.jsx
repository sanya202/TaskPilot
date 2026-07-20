import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
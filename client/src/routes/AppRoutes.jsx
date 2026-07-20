import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Workflows from "../pages/Workflows";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Tasks />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/workflows"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Workflows />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/home/Home";
import Portfolio from "../pages/portfolio/Portfolio";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardUser from "../pages/dashboardUser/dashboardUser";
import Dashboard from "../admin/Dashboard";

import ProtectedRoute from "./ProtectedRoutes";
import AdminProtectedRoutes from "./AdminProtectedRoutes";

import Navbar from "../components/partials/navbar/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboardUser"
          element={
            <ProtectedRoute>
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoutes>
              <Dashboard />
            </AdminProtectedRoutes>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

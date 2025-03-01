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

import NavBar from "../components/partials/navbar/Navbar";
import Footer from "../components/partials/footer/Footer";
import Forgot from "../pages/forget-password/Forgot";
import Reset from "../pages/forget-password/Reset";

const AppRoutes = () => {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/reset-password/:token" element={<Reset />} />

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
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;

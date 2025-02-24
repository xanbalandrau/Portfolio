import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const LogoutButton = () => {
  const navigate = useNavigate();
  const AuthContext = useAuth();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/logout`, {});

      AuthContext.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

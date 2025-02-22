import { createContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/check-auth`, {
          withCredentials: true,
        });

        setIsAuth(response.data.isAuth);
        setUser(response.data.user);

        if (response.data.user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        setIsAuth(false);
        setUser(null);
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setIsAuth(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

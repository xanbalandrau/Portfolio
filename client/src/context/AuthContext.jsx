import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const userDecoded = jwtDecode(token);
      setUser(userDecoded);

      if (userDecoded.role === "admin") {
        setIsAdmin(true);
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = (token) => {
    setToken(token);
    const userDecoded = jwtDecode(token);
    setUser(userDecoded);

    if (userDecoded.role === "admin") {
      setIsAdmin(true);
    }

    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("token", token);
    delete axios.defaults.headers.common["Authorization"];
    return <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider value={{ token, user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

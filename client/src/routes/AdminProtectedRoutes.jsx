import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ children }) => {
  const { isAuth, isAdmin } = useContext(AuthContext);

  return isAuth && isAdmin ? children : <Navigate to="/login" />;
};

export default AdminProtectedRoutes;

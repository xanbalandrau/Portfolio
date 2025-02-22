import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboardUser");
    }
  }, [isAuth, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, data, {
        withCredentials: true,
      });

      if (response.data.user) {
        login(response.data.user);
        navigate("/dashboardUser");
      }
    } catch (error) {
      console.log("Login failed :", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register("email")} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register("password")} />

      {errors.email && <p>{errors.email.message}</p>}
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

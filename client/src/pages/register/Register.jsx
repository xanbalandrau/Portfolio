import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const createUser = async (data) => {
    try {
      console.log(data);

      const response = await axios.post(`${API_URL}/api/auth/register`, data);
      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log("Register failed :", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(createUser)}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" {...register("name")} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register("email")} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register("password")} />

      {errors.name && <p>{errors.name.message}</p>}
      {errors.email && <p>{errors.email.message}</p>}
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Register;

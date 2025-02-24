import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container } from "react-bootstrap";

import OngletTitle from "../../hooks/OngletTitle";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  OngletTitle("Register");
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
    <Container className="container d-flex justify-content-center align-items-center vh-100 min-vw-100">
      <form
        onSubmit={handleSubmit(createUser)}
        className="formLogin p-4 border rounded shadow bg-light"
      >
        <h1 className="text-center mb-4">Créer un compte</h1>

        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
              maxLength: {
                value: 20,
                message: "Name must be at most 20 characters long",
              },
            })}
          />
          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Créer
        </button>
      </form>
    </Container>
  );
};

export default Register;

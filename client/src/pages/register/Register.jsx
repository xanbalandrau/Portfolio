import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container } from "react-bootstrap";
import { FaEyeSlash } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

import OngletTitle from "../../hooks/OngletTitle";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  OngletTitle("Register");
  const navigate = useNavigate();
  const [messageEmail, setMessageEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const createUser = async (data) => {
    try {
      const toastId = toast.info("Connexion en cours...", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        theme: "light",
      });
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/api/auth/register`, data);

      toast.dismiss(toastId);

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      if (error.response.data.message === "User already exists") {
        setMessageEmail("L'email est deja utilisé");
      }
      console.log("Register failed :", error);
    }
  };

  const handlePassword = (data) => {
    const { password } = data;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return false;
    }
    setMessage("");
    return true;
  };

  const onSubmit = (data) => {
    if (handlePassword(data)) {
      createUser(data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="container d-flex justify-content-center align-items-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formLogin p-4 border rounded shadow bg-light m-5"
      >
        <h1 className="text-center mb-4 text-black">Créer un compte</h1>

        <div className="mb-3">
          <label className="text-black" htmlFor="name">
            Name
          </label>
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
          <label className="text-black" htmlFor="email">
            Email
          </label>
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
          {messageEmail && <p className="text-error">{messageEmail}</p>}
        </div>

        <div className="mb-3">
          <label className="text-black" htmlFor="password">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control mb-3"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <button
              type="button"
              className="btn btn-outline-secondary control mb-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoIosEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="text-black" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            className="form-control mb-3"
          />

          {message && <p className="text-error">{message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-100"
        >
          {isLoading ? "Création en cours..." : "Créer un compte"}
        </button>
      </form>
    </Container>
  );
};

export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEyeSlash } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import OngletTitle from "../../hooks/OngletTitle";

import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL;
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Login = () => {
  OngletTitle("Login");
  const navigate = useNavigate();
  const AuthContext = useAuth();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [recaptcha, setRecaptcha] = useState("");

  const onCaptchaChange = (val) => {
    setRecaptcha(val);
  };
  const onSubmit = async (data) => {
    try {
      const notify = () =>
        toast.info("Connexion en cours...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: false,
          rtl: false,
          theme: "light",
        });
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/api/auth/login`, data);

      toast.dismiss(notify);
      AuthContext.login(response.data.token);
      navigate("/dashboardUser");
    } catch (error) {
      setMessage(error.response.data.message);
      console.error(`Login failed :`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="container d-flex justify-content-center align-items-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formLogin p-4 m-5 border rounded shadow bg-light"
      >
        <h1 className="text-center mb-4 text-black">Connexion</h1>
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
              required
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

        {message && <p className="text-error">{message}</p>}

        <div className="mb-3 d-flex justify-content-center">
          <ReCAPTCHA sitekey={SITE_KEY} onChange={onCaptchaChange} />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!recaptcha}
        >
          Login
        </button>
        <div className="text-center mt-2">
          <Link to={`/forgot-password`}>password forget</Link>
        </div>
      </form>
      {isLoading ? <ToastContainer /> : ""}
    </Container>
  );
};

export default Login;

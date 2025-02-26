import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

import { useAuth } from "../../context/AuthContext";
import OngletTitle from "../../hooks/OngletTitle";

import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL;
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Login = () => {
  OngletTitle("Login");
  const navigate = useNavigate();
  const AuthContext = useAuth();
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
      const response = await axios.post(`${API_URL}/api/auth/login`, data);
      AuthContext.login(response.data.token);
      navigate("/dashboardUser");
    } catch (error) {
      console.error(`Login failed :`, error);
    }
  };

  return (
    <Container className="container d-flex justify-content-center align-items-center vh-100 min-vw-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formLogin p-4 border rounded shadow bg-light"
      >
        <h1 className="text-center mb-4">Connexion</h1>
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
            required
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
        <div className="mb-3 d-flex justify-content-center">
          <ReCAPTCHA sitekey={SITE_KEY} onChange={onCaptchaChange} />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          // disabled={!recaptcha}
        >
          Login
        </button>
        <div className="text-center">
          <Link to={`/forgot-password`}>password forget</Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;

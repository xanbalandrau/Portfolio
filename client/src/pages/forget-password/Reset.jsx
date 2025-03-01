import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";

import OngletTitle from "../../hooks/OngletTitle";

const API_URL = import.meta.env.VITE_API_URL;

const Reset = () => {
  OngletTitle("Reset Password");
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/reset-password/${token}`,
        data
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(`Reset password failed :`, error);
    }
  };
  return (
    <Container className="container d-flex justify-content-center align-items-center mt-5 pt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formLogin p-4 border rounded shadow bg-light"
      >
        <h1 className="text-center mb-4 text-black">Nouveau mot de passe</h1>

        <div className="mb-3">
          <label className="text-black" htmlFor="password">
            Password
          </label>
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
          reset
        </button>
      </form>
    </Container>
  );
};

export default Reset;

import axios from "axios";
import { useForm } from "react-hook-form";

import OngletTitle from "../../hooks/OngletTitle";

const API_URL = import.meta.env.VITE_API_URL;

const Forgot = () => {
  OngletTitle("Forgot Password");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        data
      );
      alert(response.data.message);
    } catch (error) {
      console.error(`Reset password failed :`, error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formLogin p-4 border rounded shadow bg-light"
    >
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
      <button type="submit" className="btn btn-primary w-100">
        Envoyer
      </button>
    </form>
  );
};

export default Forgot;

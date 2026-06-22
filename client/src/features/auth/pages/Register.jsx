import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { registerUser } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth.jsx";
const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);

      login(result.data.user, result.data.accessToken);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h1>

        <div className="mb-4">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            type="email"
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-white text-slate-950 py-3 rounded-lg font-semibold"
        >
          {isSubmitting ? "Creating..." : "Register"}
        </button>

        <p className="text-slate-400 text-sm text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-white">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { loginUser } from "../services/auth.service.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);

      login(result.data.user, result.data.accessToken);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h1>

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
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-slate-400 text-sm text-center mt-4">
          Don&apos;t have account?{" "}
          <Link to="/register" className="text-white">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
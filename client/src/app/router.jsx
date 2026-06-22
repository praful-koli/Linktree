import { createBrowserRouter } from "react-router";

import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import ProtectedRoute from "../components/common/protected-route.jsx";

const Dashboard = () => {
  return <h1 className="text-3xl font-bold">Dashboard</h1>;
};

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
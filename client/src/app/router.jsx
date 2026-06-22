import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import Dashboard from "../features/links/pages/dashboard";
import Profile from "../features/profile/pages/profile";
import ProtectedRoute from "../components/common/protected-route";
import Analytics from "../features/analytics/pages/analytics";
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
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:username",
    element: <Profile />,
  },
]);
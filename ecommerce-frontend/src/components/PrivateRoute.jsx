// src/components/PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user)

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

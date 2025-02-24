import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "~/store/auth";

export function PrivateRoute() {
  const { token } = useAuthStore();

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

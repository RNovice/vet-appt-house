import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
  const { isLogin } = useAuth();
  if (!isLogin) {
    toast("請先登入帳號", {
      className: "toast-primary",
      toastId: "login-first",
    });
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

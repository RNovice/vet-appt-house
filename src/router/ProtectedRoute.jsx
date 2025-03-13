import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLogin } = useAuth();

  useEffect(() => {
    if (!isLogin) {
      toast("請先登入帳號", {
        className: "toast-primary",
        toastId: "login-first",
      });
    }
  }, [isLogin]);

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "../components/common/NavBar";

const linkPathList = [
  { name: "Dashboard", path: "/admin" },
  { name: "獸醫院管理", path: "/admin/vet-management" },
];

const AdminLayout = () => {
  const { isLogin, user } = useAuth();

  if (!isLogin || user.role !== 1) {
    return <Navigate to="/404" replace />;
  }
  return (
    <div>
      <Navbar linkPathList={linkPathList} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

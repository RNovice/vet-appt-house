import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { useAuth } from "@/context/AuthContext";

const MainLayout = () => {
  const { user } = useAuth();
  const linkPathList = [
    { name: "搜尋獸醫", path: "/search" },
    { name: "快速預約", path: "/quick" },
    { name: "最新消息", path: "/#news" },
    { name: "關於我們", path: "/about-us" },
    user?.role === 1
      ? { name: "後台管理", path: "/admin" }
      : { name: "寵物管理", path: "/user/pets" },
  ];
  return (
    <div>
      <NavBar linkPathList={linkPathList} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

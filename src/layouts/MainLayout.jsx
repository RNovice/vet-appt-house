import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <main style={{ height: "150vh" }} /* tamp style */>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

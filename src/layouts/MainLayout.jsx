import { Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

import { createHashRouter, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/client/HomePage";
import VeterinaryPage from "../pages/client/VeterinaryPage";
import UserPage from "../pages/client/UserPage";
import PetPage from "../pages/client/PetPage";
import BookingPage from "../pages/client/BookingPage";
import VetSearchPage from "../pages/client/VetSearchPage";
import AboutUs from "../pages/client/AboutUs";
import Redirect from "../pages/client/Redirect";
import DashboardPage from "../pages/admin/DashboardPage";
import VetManagementPage from "../pages/admin/VetManagementPage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";

const createRouter =
  process.env.NODE_ENV === "production"
    ? createHashRouter
    : createBrowserRouter;

export default createRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <VetSearchPage /> },
      { path: "search/result", element: <VetSearchPage /> },
      { path: "veterinary", element: <Redirect /> },
      { path: "veterinary/:id", element: <VeterinaryPage /> },
      {
        path: "user",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <UserPage /> },
          { path: "pets", element: <PetPage /> },
        ],
      },
      { path: "about-us", element: <AboutUs /> },
      { path: "nearby", element: <Redirect /> },
      { path: "quick", element: <Redirect /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "booking", element: <BookingPage /> },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "vet-management", element: <VetManagementPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

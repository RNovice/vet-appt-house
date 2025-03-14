import { createHashRouter, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import VeterinaryPage from "../pages/VeterinaryPage";
import UserPage from "../pages/UserPage";
import PetPage from "../pages/PetPage";
import ProtectedRoute from "./ProtectedRoute";
import BookingPage from "../pages/BookingPage";
import VetSearchPage from "../pages/VetSearchPage";
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs";
import Redirect from "../pages/Redirect";
import DashboardPage from "../pages/DashboardPage";
import VetManagementPage from "../pages/VetManagementPage"

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
      { path: "vetManagement", element: <VetManagementPage/> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "booking", element: <BookingPage /> },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [{ index: true, element: <DashboardPage /> },
    { path: "vet-management", element: <VetManagementPage/> },],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

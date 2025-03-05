import { createHashRouter, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import VeterinaryPage from "../pages/VeterinaryPage";
import UserPage from "../pages/UserPage";
import ProtectedRoute from "./ProtectedRoute";
import AuthWrapper from "../components/auth/AuthWrapper";
import VetSearchPage from "../pages/VetSearchPage";
import NotFound from "../pages/NotFound";
import AboutUs from "../pages/AboutUs";
import Redirect from "../pages/Redirect";

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
      { path: "veterinary", element: <VeterinaryPage /> },
      {
        path: "user",
        element: (
          <ProtectedRoute isAuthenticated={true}>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      { path: "about-us", element: <AboutUs /> },
      { path: "nearby", element: <Redirect /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  {
    path: "admin",
    element: (
      <AuthWrapper isAuthenticated={true}>
        <AuthLayout />
      </AuthWrapper>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import VeterinaryPage from "../pages/VeterinaryPage";
import UserPage from "../pages/UserPage";
import ProtectedRoute from "./ProtectedRoute";
import AuthWrapper from "../components/auth/AuthWrapper";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="veterinary" element={<VeterinaryPage />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <UserPage />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route
          path="/auth"
          element={
            <AuthWrapper isAuthenticated={true}>
              <AuthLayout />
            </AuthWrapper>
          }
        >
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

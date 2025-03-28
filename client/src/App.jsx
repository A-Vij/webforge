import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Background from "./Components/Background";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import EmailVerification from "./Pages/EmailVerification";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Home from "./Pages/Home";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import Tutorials from "./Pages/Tutorials";
import Popular from "./Pages/Popular";
import LoadingSpinner from "./Components/LoadingSpinner";

import { useAuthStore } from "./store/authStore";
import Profile from "./Pages/Profile";
import Tutorial from "./Pages/Tutorial";
import Topics from "./Pages/Topics";

const ProtectedRoute = ({ children }) => {
  const { isCheckingAuth, isAuthenticated, user, justLoggedOut } = useAuthStore();
  // console.log(user);
  const location = useLocation();

  // if(isCheckingAuth) return <LoadingSpinner />

  if (!isAuthenticated) {
    if(!justLoggedOut){
      toast.error("Login To Access", {
        style: {
          background: "#1a1a2e", // Dark background
          color: "#e0e0ff", // Light text
          border: "1px solid #7a00ff", // Purple border
          boxShadow: "0 0 10px #7a00ff",
        },
        iconTheme: {
          primary: "#7a00ff",
          secondary: "#1a1a2e",
        },
      });
    }
    return <Navigate to="/login" replace state={{from: location}} />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <Background>
      <ScrollToTop />
      {location.pathname !== "/verify-email" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/reset-password" && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/verify-email" element={<EmailVerification />} />

        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/popular" element={<Popular />} />
        <Route path="/tutorials" element={<Tutorial />} />
        <Route path="/topics" element={<Topics />} />


        <Route path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
        />

        <Route
          path="/tutorials/:slug"
          element={
            <ProtectedRoute>
              <Tutorial />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
      </Routes>
      {location.pathname !== "/verify-email" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/reset-password" && <Footer />}
      <Toaster position="top-right" />
    </Background>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./input.css";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import { useSelector } from "react-redux";
import Catalog from "./pages/Catalog";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="w-screen min-h-screen bg-gray-900 flex flex-col font-inter">
      {/* Navbar */}
      <Navbar />

      {/* Content wrapper - padding only if user logged in */}
      <div className={`${token !== null ? "pt-14" : ""}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Auth-related Routes (only for logged-out users) */}
          <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

          {/* Private (Protected) Routes */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />
          </Route>

          {/* Error Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

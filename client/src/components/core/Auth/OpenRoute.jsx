import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  // Get token from Redux state
  const token = useSelector((state) => state.auth.token);

  // If user is logged in, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard/my-profile" replace />;
  }

  // If user is NOT logged in, allow access
  return <>{children}</>;
};

export default OpenRoute;
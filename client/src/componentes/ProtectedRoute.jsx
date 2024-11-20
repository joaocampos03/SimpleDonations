import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for authentication status
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

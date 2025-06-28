// src/routes/ConnectFacebook.jsx
import React, { useEffect } from "react";

const ConnectFacebook = () => {
  useEffect(() => {
    // Redirect to backend route that starts Facebook login
    window.location.href = "http://localhost:5000/api/social/facebook/login";
  }, []);

  return <p>Redirecting to Facebook login...</p>;
};

export default ConnectFacebook;
// This component handles the redirection to the Facebook login flow.
// It will redirect the user to the backend route that initiates the Facebook OAuth process.
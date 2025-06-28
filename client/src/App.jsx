import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/Login";
import ConnectedAccounts from "./pages/ConnectedAccounts";
import ConnectFacebook from "./routes/connectFacebook";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MainLayout user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/connect-facebook" />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/connected-accounts"
          element={user ? <ConnectedAccounts /> : <Navigate to="/login" />}
        />
        <Route
          path="/connect-facebook"
          element={user ? <ConnectFacebook /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
// This is the main App component that sets up the routing for the application.
// It includes routes for the main layout, login page, connected accounts, and the Facebook connection flow.
// The user state is managed to determine if the user is logged in and to redirect accordingly.

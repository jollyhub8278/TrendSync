import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/Login";
import ConnectedAccounts from "./pages/ConnectedAccounts"; // 👈 import the new page

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
              <Navigate to="/connected-accounts" />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />

        {/* ✅ Route to show connected accounts */}
        <Route
          path="/connected-accounts"
          element={user ? <ConnectedAccounts /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

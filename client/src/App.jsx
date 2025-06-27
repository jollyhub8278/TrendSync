import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

const App = () => {
 const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainLayout user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

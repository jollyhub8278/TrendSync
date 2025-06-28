// utils/auth.js
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = "/login"; // Or use navigate if using React Router
};
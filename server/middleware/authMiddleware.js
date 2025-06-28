import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("Token received:", token);
  if (!token) return res.status(401).json({ error: "Access denied - No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;

    next();
  } catch (err) {
    console.error("JWT decode error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};


export default authMiddleware;
// This middleware checks for a valid JWT token in the request headers.
// If the token is valid, it retrieves the user from the database and attaches it to the request object.
// If the token is missing or invalid, it responds with an error message.   
// decodeToken.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const token = 'PASTE_YOUR_JWT_TOKEN_HERE'; // put the token from localStorage

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("✅ Decoded Token:", decoded);
} catch (err) {
  console.error("❌ Invalid token:", err.message);
}

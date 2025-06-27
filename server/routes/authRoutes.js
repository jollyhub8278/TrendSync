import express from "express";
import {
  registerUser,
  loginUser,
  updatePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/update-password", authMiddleware, updatePassword);

export default router;

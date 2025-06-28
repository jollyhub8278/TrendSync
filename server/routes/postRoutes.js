import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getAllPosts);        // Optional
router.get("/user", authMiddleware, getUserPosts);   // ✅ Required for Calendar.jsx

export default router;
// This code defines the routes for managing posts in a social media management application.
// It includes routes for creating a post, getting all posts, and getting posts for the authenticated user.
// The `authMiddleware` ensures that only authenticated users can access these routes.  

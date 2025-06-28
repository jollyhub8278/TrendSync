import express from "express";
import { createPost,
         getAllPosts,
        getUserPosts} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/", createPost);
// router.get("/", getAllPosts);

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getUserPosts);

export default router;

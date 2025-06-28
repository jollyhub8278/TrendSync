import express from "express";
import { getAnalyticsData } from "../controllers/analyticsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAnalyticsData);
export default router;

// This code defines the route for fetching analytics data in a social media management application.
// It includes a GET endpoint that requires authentication to access the analytics data.
// The analytics data is fetched from the database and processed to return engagement metrics for posts.
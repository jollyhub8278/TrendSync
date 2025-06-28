import express from "express";
import { generateCaptions } from "../controllers/aiController.js";

const router = express.Router();

router.post("/captions", generateCaptions);

export default router;
// This route handles generating captions using OpenAI's API
// It expects a POST request with a JSON body containing a "topic" field  
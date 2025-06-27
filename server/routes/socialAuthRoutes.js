import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import authMiddleware from "../middleware/authMiddleware.js";
import { getConnectedAccounts } from "../controllers/socialController.js";

dotenv.config();
const router = express.Router();

// Step 1: Redirect user to Facebook login
router.get("/facebook/login", (req, res) => {
  const redirectUri = encodeURIComponent(process.env.FB_REDIRECT_URI);
  const fbAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=pages_show_list,instagram_basic,pages_read_engagement,instagram_manage_insights,business_management`;
  res.redirect(fbAuthUrl);
});

// Step 2: Facebook OAuth callback
router.get("/facebook/callback", passport.authenticate("facebook", {
  failureRedirect: "/login",
}), (req, res) => {
  // You can save token/info here
  res.redirect("http://localhost:5173/"); // Redirect to your frontend app
});

router.get("/facebook/accounts", authMiddleware, getConnectedAccounts);


export default router;
// This route handles the Facebook OAuth flow.
// It redirects the user to Facebook for login and handles the callback to retrieve user information.

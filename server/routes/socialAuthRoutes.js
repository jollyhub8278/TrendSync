import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
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
}), async (req, res) => {
  try {
    const profile = req.user;

    // Extract user info
    const name = profile.displayName || "Facebook User";
    const email = profile.emails?.[0]?.value || `fb_${profile.id}@example.com`;
    const accessToken = profile.accessToken;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update Facebook token
      user.facebook = {
        accessToken,
      };
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        password: "dummy", // not used for social login
        facebook: {
          accessToken,
        },
      });
    }

    // Optional: Generate JWT and redirect with token (if needed)
    // For now, just redirect to frontend
    res.redirect("http://localhost:5173/connected-accounts");
  } catch (err) {
    console.error("OAuth callback error:", err.message);
    res.redirect("http://localhost:5173/login?error=oauth-failed");
  }
});

// Step 3: Get connected pages + IG
router.get("/facebook/accounts", authMiddleware, getConnectedAccounts);

export default router;

// This route handles the Facebook OAuth flow.
// It redirects the user to Facebook for login and handles the callback to retrieve user information.

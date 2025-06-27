import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import User from "../models/User.js"; // import your user model

dotenv.config();

passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.FB_REDIRECT_URI,
  profileFields: ['id', 'emails', 'name'] // optional but recommended
}, async function (accessToken, refreshToken, profile, done) {
  try {
    const email = profile.emails?.[0]?.value;
    let user = await User.findOne({ email });

    if (user) {
      user.facebook.accessToken = accessToken;
      // don't overwrite name/email unless needed
      await user.save();
    } else {
      user = await User.create({
        name: profile.displayName || "Facebook User",
        email: email || `fb_${profile.id}@example.com`,
        password: "dummy", // since it's via Facebook
        facebook: {
          accessToken,
        },
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Setup for session handling (if you're using sessions)
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

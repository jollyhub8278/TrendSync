import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import multer from 'multer';
import path from 'path';
import session from 'express-session';
import passport from 'passport';


import fs from 'fs';
//Routes
import authRoutes from "./routes/authRoutes.js";
import socialAuthRoutes from './routes/socialAuthRoutes.js';
import "./passport/facebookStrategy.js";

dotenv.config();
const app = express();

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/social", socialAuthRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export default app;
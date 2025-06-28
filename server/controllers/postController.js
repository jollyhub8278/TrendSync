import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { caption, hashtags, platforms, mediaUrls, scheduledFor } = req.body;
    console.log("Request body:", req.body);

    if (!caption || !platforms || !scheduledFor || !mediaUrls.length) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newPost = await Post.create({
      caption,
      hashtags,
      platforms,
      mediaUrls,
      scheduledFor,
      user: req.user._id,
    });

    res.status(201).json({ message: "Post scheduled successfully", post: newPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ error: "Failed to schedule post." });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ scheduledFor: 1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Fetch Posts Error:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({ scheduledFor: 1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Fetch posts error:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};


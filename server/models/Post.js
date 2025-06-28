import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  hashtags: [String],
  platforms: {
    type: [String],
    enum: ["instagram", "twitter", "linkedin", "facebook"],
    required: true,
  },
  mediaUrls: [String],
  scheduledFor: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["scheduled", "posted", "failed"],
    default: "scheduled",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  instagramPostId: {
    type: String
  }

});

const Post = mongoose.model("Post", postSchema);

export default Post;
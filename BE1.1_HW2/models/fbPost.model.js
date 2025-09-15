// 3

const mongoose = require("mongoose");

const fbPostSchema = new mongoose.Schema(
  {
    profileImageUrl: { type: String, required: true },
    profileName: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    postDate: { type: String, required: true },
    postTime: { type: String, required: true },
    postText: { type: String, required: true },
    postImageUrl: { type: String },
    likes: { type: Number, required: true, default: 0 },
    comments: { type: Number, required: true, default: 0 },
    shares: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const fbPost = mongoose.model("fbPost", fbPostSchema);

module.exports = fbPost;

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comments", CommentSchema);

const mongoose = require("mongoose");

const adviceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  originalAdvice: {
    type: String,
    required: true,
  },
  adviceJSON: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("advice", adviceSchema);

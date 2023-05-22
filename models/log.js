const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  workoutID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Favorites",
  },
  date: {
    type: Date,
    // default: Date.now,
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  set: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  pr: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("log", logSchema);

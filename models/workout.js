const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  workoutID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Favorites",
  },
  workout: {
    type: String,
    required: true,
  },
  workoutJSON: {
    type: Object,
    required: false,
  },
  goal: {
    type: String,
    required: true,
  },
  saved: {
    type: Boolean,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("workout", WorkoutSchema);

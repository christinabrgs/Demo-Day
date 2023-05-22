const mongoose = require("mongoose");

const logSelectionSchema = new mongoose.Schema({
  log: {
    type: Boolean,
    required: true,
  },
  excercise: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("logSelection", logSelectionSchema);

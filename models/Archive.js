const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;

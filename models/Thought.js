const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // O campo 'text' é obrigatório
  },
  author: {
    type: String,
    required: false, // O campo 'author' é opcional
  },
  createdAt: {
    type: Date,
    default: Date.now, // Data de criação automática
  },
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;

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
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;

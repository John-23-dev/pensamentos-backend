const mongoose = require("mongoose"); // Adicione esta linha para importar o mongoose

const ThoughtSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "João", // Valor padrão, caso o autor não seja especificado
  },
  createdAt: {
    type: Date,
    default: Date.now, // A data de criação é definida automaticamente
  },
});

const Thought = mongoose.model("Thought", ThoughtSchema);

module.exports = Thought;

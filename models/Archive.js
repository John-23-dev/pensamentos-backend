// models/Archive.js
const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema(
  {
    thoughtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought", // Relaciona com o modelo de Thought
      required: true,
    },
    archivedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Para ter controle de quando o arquivo foi criado
  }
);

const Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;

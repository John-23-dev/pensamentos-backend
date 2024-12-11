const express = require("express");
const router = express.Router();
const Thought = require("../models/Thought"); // Importando o modelo

// Rota para criar um novo pensamento
router.post("/", async (req, res) => {
  try {
    const { text, author } = req.body; // Extraindo o texto e o autor do corpo da requisição

    // Verificando se o campo 'text' está presente
    if (!text) {
      return res.status(400).json({ message: "O campo 'text' é obrigatório." });
    }

    const newThought = new Thought({
      text,
      author, // 'author' é opcional
    });

    // Salvando o pensamento no banco de dados
    await newThought.save();

    // Respondendo com o pensamento criado
    res.status(201).json(newThought);
  } catch (error) {
    console.error("Erro ao criar pensamento:", error); // Log de erro para depuração
    res
      .status(400)
      .json({ message: "Erro ao criar pensamento", error: error.message });
  }
});

// Rota para obter todos os pensamentos
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(400).json({ message: "Erro ao obter pensamentos", error });
  }
});

module.exports = router;

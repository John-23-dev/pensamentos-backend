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

    // Se o autor não for fornecido, podemos atribuir um valor padrão (ex: "João")
    const newThought = new Thought({
      text,
      author: author || "João", // Se não houver autor, usa "João" como padrão
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

// Rota para obter todos os pensamentos, com opção de filtrar por autor
router.get("/", async (req, res) => {
  try {
    const { author } = req.query; // Verificando se há um filtro de autor na query

    let thoughts;
    if (author) {
      thoughts = await Thought.find({ author }); // Filtrando por autor
    } else {
      thoughts = await Thought.find(); // Retornando todos os pensamentos
    }

    res.status(200).json(thoughts);
  } catch (error) {
    res.status(400).json({ message: "Erro ao obter pensamentos", error });
  }
});

module.exports = router;

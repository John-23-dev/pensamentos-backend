const mongoose = require("mongoose"); // Adicione esta linha para importar o mongoose
const express = require("express");
const router = express.Router();
const Thought = require("../models/Thought"); // Importando o modelo
const Archive = require("../models/Archive"); // Importando o modelo de Archive

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Tentando excluir pensamento com ID:", id); // Já existe, mas coloque outros logs

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("ID inválido:", id);
      return res.status(400).json({ message: "ID inválido." });
    }

    console.log("ID válido. Continuando com a exclusão...");

    const deletedThought = await Thought.findByIdAndDelete(id);

    if (!deletedThought) {
      console.log("Pensamento não encontrado para ID:", id);
      return res.status(404).json({ message: "Pensamento não encontrado." });
    }

    console.log("Pensamento excluído:", deletedThought); // Log do pensamento excluído

    res.status(200).json({
      message: "Pensamento excluído com sucesso!",
      deletedThought,
    });
  } catch (error) {
    console.error("Erro ao excluir pensamento:", error);
    res
      .status(500)
      .json({ message: "Erro ao excluir pensamento.", error: error.message });
  }
});
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

// Rota para obter todos os pensamentos, com opção de filtrar por autor e paginar os resultados
router.get("/", async (req, res) => {
  const { author, limit, page } = req.query;
  const query = author ? { author } : {};

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const thoughts = await Thought.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const totalThoughts = await Thought.countDocuments(query);

    res.status(200).json({
      thoughts,
      totalPages: Math.ceil(totalThoughts / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar pensamentos", error });
  }
});

module.exports = router;

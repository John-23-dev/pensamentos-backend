const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron"); // Importação do cron job
const Thought = require("./models/Thought"); // Modelo de pensamentos

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexão com MongoDB
const uri =
  "mongodb+srv://admin:admin@cluster0.sl4v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Rotas
const thoughtsRoutes = require("./routes/thoughts");
app.use("/thoughts", thoughtsRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Cron job para rodar uma vez por dia (a cada 24 horas)
cron.schedule("0 0 * * *", async () => {
  console.log("Cron job de exclusão de pensamentos antigos em execução...");

  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Subtrai 1 dia da data atual

    // Encontre todos os pensamentos com mais de 1 dia
    const oldThoughts = await Thought.find({
      createdAt: { $lt: yesterday },
    });

    if (oldThoughts.length > 0) {
      // Exclui os pensamentos antigos da coleção Thought
      await Thought.deleteMany({
        createdAt: { $lt: yesterday },
      });
      console.log(`Excluídos ${oldThoughts.length} pensamentos.`);
    } else {
      console.log("Nenhum pensamento para excluir hoje.");
    }
  } catch (error) {
    console.error("Erro ao executar o cron job:", error);
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

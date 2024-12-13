const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron"); // Importação do cron job
const Thought = require("./models/Thought"); // Modelo de pensamentos
const Archive = require("./models/Archive"); // Modelo para pensamentos arquivados

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

// Cron Job para arquivar pensamentos diariamente às 23:59
cron.schedule("59 23 * * *", async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Data de ontem

    console.log("Iniciando processo de arquivamento...");

    // Filtrar pensamentos criados antes de ontem
    const thoughtsToArchive = await Thought.find({
      createdAt: { $lt: yesterday },
    });

    if (thoughtsToArchive.length > 0) {
      // Insere os pensamentos no modelo de arquivados
      await Archive.insertMany(thoughtsToArchive);

      // Remove os pensamentos arquivados do modelo original
      await Thought.deleteMany({ createdAt: { $lt: yesterday } });

      console.log(`Arquivados ${thoughtsToArchive.length} pensamentos.`);
    } else {
      console.log("Nenhum pensamento para arquivar hoje.");
    }
  } catch (error) {
    console.error("Erro ao arquivar pensamentos:", error);
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

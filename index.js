const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://admin:admin@cluster0.sl4v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.error);

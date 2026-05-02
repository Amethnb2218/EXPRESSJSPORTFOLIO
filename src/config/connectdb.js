const mongoose = require("mongoose");

let memoryServer;

const shouldUseMemoryDb = () => process.env.USE_MEMORY_DB === "true";

const getMongoUri = async () => {
  if (shouldUseMemoryDb()) {
    const { MongoMemoryServer } = require("mongodb-memory-server");

    memoryServer = await MongoMemoryServer.create();
    console.log("MongoDB demo en memoire active");

    return memoryServer.getUri();
  }

  return process.env.MONGO_URI;
};

const stopMemoryDb = async () => {
  if (memoryServer) {
    await memoryServer.stop();
  }
};

const connectdb = async () => {
  const mongoUri = await getMongoUri();

  if (!mongoUri) {
    console.error("MONGO_URI est manquant dans le fichier .env");
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connecte: ${connection.connection.host}`);
  } catch (error) {
    console.error("Erreur de connexion a MongoDB:", error.message);
    console.error(
      "Verifiez la chaine MongoDB Atlas, l'utilisateur, le mot de passe et l'adresse IP autorisee."
    );
    console.error("Pour une demo locale, mettez USE_MEMORY_DB=true dans .env.");
    process.exit(1);
  }
};

process.once("SIGINT", async () => {
  await stopMemoryDb();
  process.exit(0);
});

process.once("SIGTERM", async () => {
  await stopMemoryDb();
  process.exit(0);
});

module.exports = connectdb;

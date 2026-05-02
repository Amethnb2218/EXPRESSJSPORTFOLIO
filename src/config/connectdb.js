const mongoose = require("mongoose");

const connectdb = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI est manquant dans le fichier .env");
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connecte: ${connection.connection.host}`);
  } catch (error) {
    console.error("Erreur de connexion a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectdb;

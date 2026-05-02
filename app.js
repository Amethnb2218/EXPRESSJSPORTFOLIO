require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectdb = require("./src/config/connectdb");
const projectRoutes = require("./src/routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API REST Portfolio avec Express JS et MongoDB",
  });
});

app.use("/api/projects", projectRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route introuvable",
  });
});

const startServer = async () => {
  await connectdb();

  app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;

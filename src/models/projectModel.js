const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    libelle: {
      type: String,
      required: [true, "Le libelle est obligatoire"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    categorie: {
      type: String,
      required: [true, "La categorie est obligatoire"],
      trim: true,
    },
    periode: {
      type: String,
      default: "",
      trim: true,
    },
    statut: {
      type: String,
      default: "En cours",
      trim: true,
    },
    role: {
      type: String,
      default: "",
      trim: true,
    },
    lien: {
      type: String,
      default: "",
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "La description est obligatoire"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);

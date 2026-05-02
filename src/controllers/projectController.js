const mongoose = require("mongoose");
const Project = require("../models/projectModel");

const isValidProjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Projet ajoute avec succes",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Impossible d'ajouter le projet",
      error: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Impossible de recuperer les projets",
      error: error.message,
    });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;

  if (!isValidProjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Identifiant de projet invalide",
    });
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Projet introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Impossible de recuperer le projet",
      error: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!isValidProjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Identifiant de projet invalide",
    });
  }

  try {
    const project = await Project.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Projet introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Projet modifie avec succes",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Impossible de modifier le projet",
      error: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!isValidProjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Identifiant de projet invalide",
    });
  }

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Projet introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Projet supprime avec succes",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Impossible de supprimer le projet",
      error: error.message,
    });
  }
};

module.exports = {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

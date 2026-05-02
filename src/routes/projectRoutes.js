const express = require("express");
const {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

router.route("/").post(addProject).get(getProjects);
router.route("/:id").get(getProjectById).put(updateProject).delete(deleteProject);

module.exports = router;

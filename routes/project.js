const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project");
const {isAdmin}=require("../middleware");

router.get("/new", projectController.newProjectForm);

router.post("/", projectController.createProject);

router.get("/:id", projectController.showProject);

router.get("/:id/edit", projectController.editProjectForm);

router.put("/:id", projectController.updateProject);

router.delete("/:id", projectController.deleteProject);

module.exports = router;
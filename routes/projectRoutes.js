const express = require("express");
const {
  validateBody,
  createProjectSchema,
} = require("../middleware/validator");
const {
  authorizeUser,
  authorizeAdmin,
} = require("../middleware/authorization");

const {
  getAllProjects,
  createProject,
} = require("../controller/projectController");
const { checkProjectManager } = require("../middleware/checkUser");
const router = express.Router();

// Routes

// Admin can get all projects
router.get("/", authorizeUser, authorizeAdmin, getAllProjects);

// Admin can create a project
router.post(
  "/",
  validateBody(createProjectSchema),
  authorizeUser,
  authorizeAdmin,
  checkProjectManager,
  createProject
);

module.exports = router;

const express = require("express");
const {
  validateBody,
  createProjectSchema,
} = require("../middleware/validator");
const { authorizeUser } = require("../middleware/authorization");
const { authenticateAdmin } = require("../middleware/authentication");
const {
  getAllProjects,
  createProject,
} = require("../controller/projectController");
const { checkProjectManager } = require("../middleware/checkUser");
const router = express.Router();

// Routes

// Admin can get all projects
router.get("/", authorizeUser, authenticateAdmin, getAllProjects);

// Admin can create a project
router.post(
  "/",
  validateBody(createProjectSchema),
  authorizeUser,
  authenticateAdmin,
  checkProjectManager,
  createProject
);

module.exports = router;

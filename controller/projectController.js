const { Project } = require("../model/projectModel");

// @desc    Get all Projects
// @route   GET /api/projects
// Private
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("projectManager", "username")
      .populate("teamLead", "username")
      .populate("teamMember", "username");
    res.status(200).send(projects);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Create a project
// @route   POST /api/project
// Private
const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      projectManager: req.body.projectManager,
      status: "Onboarding",
    });
    const result = await project.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.getAllProjects = getAllProjects;
module.exports.createProject = createProject;

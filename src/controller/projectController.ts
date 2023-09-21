import  Project  from "../model/projectModel"
import { Response, Request } from "express";

// @desc    Get all Projects
// @route   GET /api/projects
// Private
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .populate("projectManager", "username")
      .populate("teamLead", "username")
      .populate("teamMember", "username");
    res.status(200).send(projects);
  } catch (err:any) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Create a project
// @route   POST /api/project
// Private
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      projectManager: req.body.projectManager,
    });
    const result = await project.save();
    res.status(201).send(result);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};


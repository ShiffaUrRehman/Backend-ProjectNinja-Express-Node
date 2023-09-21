import express,{ NextFunction, Response, Request }  from "express";
import { validateBody, createProjectSchema } from "../middleware/validator";
import { authorizeUser, authorizeAdmin } from "../middleware/authorization";

import { getAllProjects, createProject } from "../controller/projectController";
import { checkProjectManager } from "../middleware/checkUser";
import { RequestWithUser } from 'types';

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


export default router
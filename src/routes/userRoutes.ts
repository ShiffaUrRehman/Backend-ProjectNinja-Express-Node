import express from "express"
import { getUsers, createUser } from "../controller/userController";
import { createUserSchema, validateBody, loginUserSchema } from "../middleware/validator";
import { authorizeUser, authorizeAdmin } from "../middleware/authorization";
import { login } from "../controller/authController";

const Router = express.Router();

// Routes

// Admin can get all users
Router.get("/", authorizeUser, authorizeAdmin, getUsers);

// Admin can create users
Router.post(
  "/",
  validateBody(createUserSchema),
  authorizeUser,
  authorizeAdmin,
  createUser
);

Router.post("/login", validateBody(loginUserSchema), login);


export default Router


const express = require("express");
const { getUsers, createUser } = require("../controller/userController");
const {
  createUserSchema,
  validateBody,
  loginUserSchema,
} = require("../middleware/validator");
const {
  authorizeUser,
  authorizeAdmin,
} = require("../middleware/authorization");
const { login } = require("../controller/authController");
const router = express.Router();

// Routes

// Admin can get all users
router.get("/", authorizeUser, authorizeAdmin, getUsers);

// Admin can create users
router.post(
  "/",
  validateBody(createUserSchema),
  authorizeUser,
  authorizeAdmin,
  createUser
);

router.post("/login", validateBody(loginUserSchema), login);
module.exports = router;

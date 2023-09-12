const express = require("express");
const { getUsers, createUser } = require("../controller/userController");
const {
  createUserSchema,
  validateBody,
  loginUserSchema,
} = require("../middleware/validator");
const { authorizeUser } = require("../middleware/authorization");
const { authenticateAdmin } = require("../middleware/authentication");
const { login } = require("../controller/authController");
const router = express.Router();

// Routes

// Admin can get all users
router.get("/", authorizeUser, authenticateAdmin, getUsers);

// Admin can create users
router.post(
  "/",
  validateBody(createUserSchema),
  authorizeUser,
  authenticateAdmin,
  createUser
);

router.post("/login", validateBody(loginUserSchema), login);
module.exports = router;

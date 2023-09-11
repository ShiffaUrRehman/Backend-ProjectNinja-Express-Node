const express = require("express");
const { getUsers, createUser, login } = require("../controller/userController");
const {
  createUserSchema,
  validateBody,
  loginUserSchema,
} = require("../middleware/userValidator");
const { authorizeUser } = require("../middleware/authorization");
const { authenticateAdmin } = require("../middleware/authentication");
const router = express.Router();

// Routes

router.get("/", authorizeUser(), authenticateAdmin(), getUsers);
router.post(
  "/",
  validateBody(createUserSchema),
  authorizeUser(),
  authenticateAdmin(),
  createUser
);
router.post("/login", validateBody(loginUserSchema), login);
module.exports = router;

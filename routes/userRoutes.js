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

router.get("/", authorizeUser(), authenticateAdmin(), getUsers);
router.post("/", validateBody(createUserSchema), createUser);
router.post("/login", validateBody(loginUserSchema), login);
module.exports = router;

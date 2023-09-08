const express = require("express");
const { getUsers, createUser, login } = require("../controller/userController");
const {
  createUserSchema,
  validateBody,
  loginUserSchema,
} = require("../middleware/userValidator");
const router = express.Router();

router.get("/", getUsers);
router.post("/", validateBody(createUserSchema), createUser);
router.post("/login", validateBody(loginUserSchema), login);
module.exports = router;

const express = require("express");
const { getUsers, createUser } = require("../controller/userController");
const { userSchema, validateBody } = require("../middleware/userValidator");
const router = express.Router();

router.get("/", getUsers);
router.post("/", validateBody(userSchema), createUser);

module.exports = router;

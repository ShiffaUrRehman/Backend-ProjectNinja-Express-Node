const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

// @desc    Get all Users
// @route   GET /api/user
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Login a User
// @route   POST /api/user/login

const login = async (req, res) => {
  // !!!
  // Check validation for this body
  // !!!
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(404).send({ message: "User not found" });
    else {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        res.status(404).send("Wrong Password");
      } else {
        res.status(200).send(user);
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Create a user
// @route   POST /api/user
const createUser = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });
    const result = await user.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
module.exports.login = login;

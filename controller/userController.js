const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Get all Users
// @route   GET /api/user
// Private
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
// Public
const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(404).send({ message: "User not found" });
    else {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        res.status(404).send("Wrong Password");
      } else {
        const obj = { id: user._id };
        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).send({ user, token: token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// @desc    Create a user
// @route   POST /api/user
// Private
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

const { User } = require("../model/userModel");

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

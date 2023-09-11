const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        res.status(404).send({ message: "Provided password is incorrect" });
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

module.exports.login = login;

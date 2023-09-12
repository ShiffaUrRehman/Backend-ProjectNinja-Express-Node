const { User } = require("../model/userModel");
const mongoose = require("mongoose");

const checkProjectManager = async (req, res, next) => {
  // Check if the id is of Project Manager or Not
  // To check user type given the id
  try {
    const id = req.body.projectManager;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(403).send({
        message: "Id is not valid",
      });
    } else {
      const user = await User.findById(id);
      if (user.role === "Project Manager") {
        next();
      } else {
        return res.status(403).send({
          message: "Id given is not of Project Manager",
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports.checkProjectManager = checkProjectManager;

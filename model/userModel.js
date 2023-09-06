const mongoose = require("mongoose");

// Schema and Model for items in ToDo list
const User = mongoose.model(
  "user",
  mongoose.Schema(
    {
      username: {
        type: String,
        maxlength: 1024,
        required: true,
      },
      password: {
        type: String,
        maxlength: 1024,
        required: true,
      },
      role: {
        type: String,
        enum: ["Admin", "Project Manager", "Team Lead", "Team Member"], // Do we add Admin here? We add admin ourselves, and mongo doesnt validate anyways.
        maxlength: 1024,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports.User = User;

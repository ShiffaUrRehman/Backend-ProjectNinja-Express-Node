const mongoose = require("mongoose");

// Schema and Model for Projects
const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 1024,
      required: true,
    },
    status: {
      type: String,
      enum: ["Onboarding", "In Progress", "Complete"],
      required: true,
    },
    description: {
      type: String,
      minlength: 255,
      required:false,
      required: true,
    },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    teamLead: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    teamMember: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", ProjectSchema);

module.exports.Project = Project;

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
      maxlength: 1024,
      enum: ["Onboarding", "In Progress", "Complete"],
      required: true,
    },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    teamLead: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    teamMember: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", ProjectSchema);

module.exports.Project = Project;

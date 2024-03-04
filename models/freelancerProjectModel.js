const mongoose = require('mongoose');

const freelancerProjectModel = mongoose.Schema({
  freelancerProjectId: {
    type: Number,
    required: [true, 'A freelancer project must have an id.'],
  },
  projectName: {
    type: String,
    required: [true, 'A freelancer project must have a name.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A freelancer project must have a description'],
    trim: true,
  },
  technologyUsed: {
    type: String,
    required: [true, 'A freelancer project must have technologies.'],
  },
  attachments: [],
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const FreelancerProject = mongoose.model(
  'freelancer-project',
  freelancerProjectModel
);

module.exports = FreelancerProject;

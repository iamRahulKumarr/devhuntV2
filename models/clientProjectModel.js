const mongoose = require('mongoose');

const clientProjectModel = mongoose.Schema({
  clientProjectId: {
    type: Number,
    required: [true, 'A project must have an id'],
  },
  projectName: {
    type: String,
    required: [true, 'A project must have a name.'],
    trim: true,
  },
  technology: {
    type: String,
    required: [true, 'A project must have a technology'],
  },
  description: {
    type: String,
    required: [true, 'A project must have a description'],
    trim: true,
  },
  attachment: [],
  duration: {
    type: String,
    required: [true, 'A project must have a duration'],
  },
  budget: {
    type: Number,
    required: [true, 'A project must have a budget'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const ClientProject = mongoose.model('client-project', clientProjectModel);

module.exports = ClientProject;

const mongoose = require('mongoose');

const freelancerModel = mongoose.Schema({
  freelancerId: {
    type: Number,
    required: [true, 'A freelancer must have an id.'],
  },
  firstName: {
    type: String,
    required: [true, 'A freelancer must have a first name.'],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A freelancer must have an email.'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    // required: [true, 'A freelancer must have a password.'],
    select: false,
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

const Freelancer = mongoose.model('freelancer', freelancerModel);

module.exports = Freelancer;

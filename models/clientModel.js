const mongoose = require('mongoose');

const clientModel = mongoose.Schema({
  clientId: {
    type: Number,
    required: [true, 'A client must have an id.'],
  },
  firstName: {
    type: String,
    required: [true, 'A client must have a first name.'],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A client must have an email.'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    // required: [true, 'A client must have a password.'],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  status: {
    type: Boolean,
    default: true,
  },
});

const Client = mongoose.model('client', clientModel);

module.exports = Client;

const clientController = require('./../controllers/clientController');
const clientProjectController = require('./../controllers/clientProjectController');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(clientController.getClients)
  .post(clientController.createClient);

router
  .route('/projects')
  .get(clientProjectController.getProjects)
  .post(clientProjectController.createProject);

// TODO: Profile, Bidding, Message Routes yet to add..........

module.exports = router;

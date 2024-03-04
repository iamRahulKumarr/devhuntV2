const freelancerController = require('./../controllers/freelancerController');
const freelancerProjectController = require('./../controllers/freelancerProjectController');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(freelancerController.getFreelancers)
  .post(freelancerController.createFreelancer);

router
  .route('/projects')
  .get(freelancerProjectController.getProjects)
  .post(freelancerProjectController.createProject);

// TODO: Profile, Bidding, Message Routes yet to add..........

module.exports = router;

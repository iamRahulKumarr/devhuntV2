const FreelancerProject = require('./../models/freelancerProjectModel');

exports.getProjects = async (req, res) => {
  try {
    let query = FreelancerProject.find(req.query);

    const freelancerProjects = await query;
    const totalProjects = freelancerProjects.length;

    res.status(200).json({
      status: 'success',
      total: totalProjects,
      data: {
        freelancerProjects,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const freelancerProjectId = (await FreelancerProject.countDocuments()) + 1;
    const newFreelancerProject = await FreelancerProject.create({
      freelancerProjectId,
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      message: 'New freelancer project created!',
      data: {
        freelancer: newFreelancerProject,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

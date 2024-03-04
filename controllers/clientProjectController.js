const ClientProject = require('./../models/clientProjectModel');

exports.getProjects = async (req, res) => {
  try {
    const query = ClientProject.find(req.query);

    const projects = await query;
    const totalProjects = projects.length;
    res.status(200).json({
      status: 'success',
      totalProjects,
      data: {
        projects,
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
    const clientProjectId = (await ClientProject.countDocuments()) + 1;
    const project = await ClientProject.create({
      clientProjectId,
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      message: 'New project created!',
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

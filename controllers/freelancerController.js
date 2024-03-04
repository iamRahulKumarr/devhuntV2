const Freelancer = require('./../models/freelancerModel');

exports.getFreelancers = async (req, res) => {
  try {
    let query = Freelancer.find(req.query);

    const freelancers = await query;
    const totalFreelancers = freelancers.length;

    res.status(200).json({
      status: 'success',
      total: totalFreelancers,
      data: {
        freelancers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.createFreelancer = async (req, res) => {
  try {
    const freelancerId = (await Freelancer.countDocuments()) + 1;
    const newFreelancer = await Freelancer.create({
      freelancerId,
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      message: 'New freelancer created!',
      data: {
        freelancer: newFreelancer,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

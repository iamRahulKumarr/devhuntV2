const Client = require('./../models/clientModel');

exports.getClients = async (req, res) => {
  try {
    let query = Client.find(req.query);

    const clients = await query;
    const totalClients = clients.length;

    res.status(200).json({
      status: 'success',
      total: totalClients,
      data: {
        clients,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.createClient = async (req, res) => {
  try {
    const clientId = (await Client.countDocuments()) + 1;
    const newClient = await Client.create({
      clientId,
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      message: 'New client created!',
      data: {
        client: newClient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

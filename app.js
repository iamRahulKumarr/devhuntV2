const clientRouter = require('./routes/clientRoutes');
const freelancerRouter = require('./routes/freelancerRoutes');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/clients', clientRouter);
app.use('/freelancers', freelancerRouter);

module.exports = app;

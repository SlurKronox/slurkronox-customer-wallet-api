const express = require('express');
const { rotasUsuarios, rotasCustomers } = require('./routes');

const rotasApi = express.Router();

rotasApi.use('/usuarios', rotasUsuarios);
rotasApi.use('/customers', rotasCustomers);

module.exports = { rotasApi };

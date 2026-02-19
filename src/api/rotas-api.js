const express = require('express');
const { rotasUsuarios, rotasCustomers, rotasHealth } = require('./routes');

const rotasApi = express.Router();

rotasApi.use('/health', rotasHealth);
rotasApi.use('/usuarios', rotasUsuarios);
rotasApi.use('/customers', rotasCustomers);

module.exports = { rotasApi };

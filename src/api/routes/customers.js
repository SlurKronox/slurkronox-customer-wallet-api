const express = require('express');
const { customersControlador } = require('../controllers');

const rotas = express.Router();

rotas.get('/', customersControlador.listarCustomers);
rotas.get('/:id', customersControlador.obterCustomerPorId);

module.exports = rotas;

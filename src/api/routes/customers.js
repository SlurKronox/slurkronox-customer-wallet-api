const express = require('express');
const { customersControlador } = require('../controllers');

const rotas = express.Router();

rotas.get('/', customersControlador.listarCustomers);
rotas.get('/:id', customersControlador.obterCustomerPorId);
rotas.post('/', customersControlador.criarCustomer);
rotas.put('/:id', customersControlador.atualizarCustomer);
rotas.patch('/:id', customersControlador.atualizarParcialCustomer);
rotas.delete('/:id', customersControlador.excluirCustomer);

module.exports = rotas;

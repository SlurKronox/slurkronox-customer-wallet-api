const express = require('express');
const { customersControlador } = require('../controllers');

const rotas = express.Router();

// Base: /api/v1/customers
// GET / -> lista todos os customers.
rotas.get('/', customersControlador.listarCustomers);

// GET /:id -> busca um customer especifico pelo id.
rotas.get('/:id', customersControlador.obterCustomerPorId);

// POST / -> cria um novo customer.
rotas.post('/', customersControlador.criarCustomer);

// PUT /:id -> atualiza todos os dados de um customer.
rotas.put('/:id', customersControlador.atualizarCustomer);

// PATCH /:id -> atualiza apenas alguns campos do customer.
rotas.patch('/:id', customersControlador.atualizarParcialCustomer);

// DELETE /:id -> remove o customer pelo id.
rotas.delete('/:id', customersControlador.excluirCustomer);

module.exports = rotas;

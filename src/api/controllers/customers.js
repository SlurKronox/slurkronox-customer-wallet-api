const { customersServico } = require('../services');
const { ErroHttp } = require('../../compartilhado');

function parsearIdCustomer(req) {
  const id = typeof req.params.id === 'string' ? req.params.id.trim() : '';
  if (!id) {
    throw new ErroHttp(400, 'Id de customer invalido');
  }

  return id;
}

function listarCustomers(req, res, next) {
  try {
    const customers = customersServico.listarCustomers();
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
}

function obterCustomerPorId(req, res, next) {
  try {
    const id = parsearIdCustomer(req);
    const customer = customersServico.obterCustomerPorId(id);

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
}

function criarCustomer(req, res, next) {
  try {
    const customer = customersServico.criarCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
}

function atualizarCustomer(req, res, next) {
  try {
    const id = parsearIdCustomer(req);
    const customer = customersServico.atualizarCustomer(id, req.body);
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
}

function atualizarParcialCustomer(req, res, next) {
  try {
    const id = parsearIdCustomer(req);
    const customer = customersServico.atualizarParcialCustomer(id, req.body);
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
}

function excluirCustomer(req, res, next) {
  try {
    const id = parsearIdCustomer(req);
    customersServico.excluirCustomer(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarCustomers,
  obterCustomerPorId,
  criarCustomer,
  atualizarCustomer,
  atualizarParcialCustomer,
  excluirCustomer,
};

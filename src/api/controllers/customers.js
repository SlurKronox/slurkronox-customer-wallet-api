const { customersServico } = require('../services');
const { ErroHttp, sucesso } = require('../../compartilhado');

// Controller de customers: recebe a requisicao HTTP e delega a regra para o service.
// Aqui ficam somente validacoes simples de rota/parametros e a resposta HTTP.

function parsearIdCustomer(req) {
  const id = typeof req.params.id === 'string' ? req.params.id.trim() : '';
  if (!id) {
    throw new ErroHttp(400, 'Id de customer invalido');
  }

  return id;
}

function listarCustomers(req, res, next) {
  try {
    // Lista todos os customers.
    const customers = customersServico.listarCustomers();
    sucesso(res, 200, customers, { total: customers.length });
  } catch (err) {
    next(err);
  }
}

function obterCustomerPorId(req, res, next) {
  try {
    // Busca um customer pelo id informado na URL.
    const id = parsearIdCustomer(req);
    const customer = customersServico.obterCustomerPorId(id);

    sucesso(res, 200, customer);
  } catch (err) {
    next(err);
  }
}

function criarCustomer(req, res, next) {
  try {
    // Cria um novo customer com os dados enviados no body.
    const customer = customersServico.criarCustomer(req.body);
    sucesso(res, 201, customer);
  } catch (err) {
    next(err);
  }
}

function atualizarCustomer(req, res, next) {
  try {
    // Atualiza todos os dados do customer (PUT).
    const id = parsearIdCustomer(req);
    const customer = customersServico.atualizarCustomer(id, req.body);
    sucesso(res, 200, customer);
  } catch (err) {
    next(err);
  }
}

function atualizarParcialCustomer(req, res, next) {
  try {
    // Atualiza apenas alguns campos do customer (PATCH).
    const id = parsearIdCustomer(req);
    const customer = customersServico.atualizarParcialCustomer(id, req.body);
    sucesso(res, 200, customer);
  } catch (err) {
    next(err);
  }
}

function excluirCustomer(req, res, next) {
  try {
    // Remove o customer pelo id.
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

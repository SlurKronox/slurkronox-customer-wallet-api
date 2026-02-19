const { customersRepositorio } = require('../data');
const { ErroHttp } = require('../../compartilhado');
const {
  validarCriacaoCustomer,
  validarAtualizacaoCustomer,
  validarAtualizacaoParcialCustomer,
} = require('../validators');

function listarCustomers() {
  return customersRepositorio.listar();
}

function obterCustomerPorId(id) {
  const customer = customersRepositorio.obterPorId(id);
  if (!customer) {
    throw new ErroHttp(404, 'Customer nao encontrado');
  }

  return customer;
}

function criarCustomer(payload) {
  const { valido, erros, dados } = validarCriacaoCustomer(payload);
  if (!valido) {
    throw new ErroHttp(400, 'Erro de validacao', erros);
  }

  if (dados.id && customersRepositorio.obterPorId(dados.id)) {
    throw new ErroHttp(409, 'Id de customer ja existe');
  }

  if (customersRepositorio.obterPorEmail(dados.email)) {
    throw new ErroHttp(409, 'Email de customer ja esta em uso');
  }

  return customersRepositorio.criar(dados);
}

function atualizarCustomer(id, payload) {
  const { valido, erros, dados } = validarAtualizacaoCustomer(payload);
  if (!valido) {
    throw new ErroHttp(400, 'Erro de validacao', erros);
  }

  const atual = customersRepositorio.obterPorId(id);
  if (!atual) {
    throw new ErroHttp(404, 'Customer nao encontrado');
  }

  if (dados.email && dados.email !== atual.email) {
    const existente = customersRepositorio.obterPorEmail(dados.email);
    if (existente) {
      throw new ErroHttp(409, 'Email de customer ja esta em uso');
    }
  }

  const customer = customersRepositorio.substituir(id, dados);

  return customer;
}

function atualizarParcialCustomer(id, payload) {
  const { valido, erros, dados } = validarAtualizacaoParcialCustomer(payload);
  if (!valido) {
    throw new ErroHttp(400, 'Erro de validacao', erros);
  }

  const atual = customersRepositorio.obterPorId(id);
  if (!atual) {
    throw new ErroHttp(404, 'Customer nao encontrado');
  }

  if (dados.email && dados.email !== atual.email) {
    const existente = customersRepositorio.obterPorEmail(dados.email);
    if (existente) {
      throw new ErroHttp(409, 'Email de customer ja esta em uso');
    }
  }

  const customer = customersRepositorio.atualizarParcial(id, dados);

  return customer;
}

function excluirCustomer(id) {
  const removido = customersRepositorio.remover(id);
  if (!removido) {
    throw new ErroHttp(404, 'Customer nao encontrado');
  }

  return true;
}

module.exports = {
  listarCustomers,
  obterCustomerPorId,
  criarCustomer,
  atualizarCustomer,
  atualizarParcialCustomer,
  excluirCustomer,
};

const { customersRepositorio } = require('../data');
const { ErroHttp } = require('../../compartilhado');

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

module.exports = {
  listarCustomers,
  obterCustomerPorId,
};

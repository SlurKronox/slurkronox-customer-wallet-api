const { randomUUID } = require('node:crypto');
const customerWallets = require('./referencias/customer-wallets.json');

const customers = Array.isArray(customerWallets.customerWallets && customerWallets.customerWallets.data)
  ? customerWallets.customerWallets.data.map((item) => ({ ...item }))
  : [];

function listar() {
  return customers.map((item) => ({ ...item }));
}

function obterPorId(id) {
  const customer = customers.find((item) => item.id === id);
  return customer ? { ...customer } : null;
}

function obterPorEmail(email) {
  const normalizado = email.toLowerCase();
  const customer = customers.find((item) => item.email.toLowerCase() === normalizado);
  return customer ? { ...customer } : null;
}

function criar(dados) {
  const agora = new Date().toISOString();
  const customer = {
    ...dados,
    id: dados.id || randomUUID(),
    createdAt: agora,
  };

  customers.push(customer);
  return { ...customer };
}

function substituir(id, dados) {
  const indice = customers.findIndex((item) => item.id === id);
  if (indice === -1) {
    return null;
  }

  const atual = customers[indice];
  const customer = {
    ...atual,
    ...dados,
    id,
    createdAt: atual.createdAt || new Date().toISOString(),
  };

  customers[indice] = customer;
  return { ...customer };
}

function atualizarParcial(id, dados) {
  const indice = customers.findIndex((item) => item.id === id);
  if (indice === -1) {
    return null;
  }

  const customer = {
    ...customers[indice],
    ...dados,
    id,
  };

  customers[indice] = customer;
  return { ...customer };
}

function remover(id) {
  const indice = customers.findIndex((item) => item.id === id);
  if (indice === -1) {
    return false;
  }

  customers.splice(indice, 1);
  return true;
}

module.exports = {
  listar,
  obterPorId,
  obterPorEmail,
  criar,
  substituir,
  atualizarParcial,
  remover,
};

const customerWallets = require('./referencias/customer-wallets.json');

function listar() {
  return customerWallets;
}

function obterPorId(id) {
  return customerWallets.customerWallets.data.find((item) => item.id === id) || null;
}

module.exports = {
  listar,
  obterPorId,
};

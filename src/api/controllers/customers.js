const { customersServico } = require('../services');

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
    const { id } = req.params;
    const customer = customersServico.obterCustomerPorId(id);

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarCustomers,
  obterCustomerPorId,
};

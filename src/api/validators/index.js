const {
  validarCriacaoUsuario,
  validarAtualizacaoUsuario,
  validarAtualizacaoParcialUsuario,
} = require('./usuarios-validador');
const {
  validarCriacaoCustomer,
  validarAtualizacaoCustomer,
  validarAtualizacaoParcialCustomer,
} = require('./customers-validador');

module.exports = {
  validarCriacaoUsuario,
  validarAtualizacaoUsuario,
  validarAtualizacaoParcialUsuario,
  validarCriacaoCustomer,
  validarAtualizacaoCustomer,
  validarAtualizacaoParcialCustomer,
};

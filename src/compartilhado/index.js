const { ErroHttp } = require('./erros');
const { naoEncontrado, tratadorErro } = require('./intermediarios');

module.exports = {
  ErroHttp,
  naoEncontrado,
  tratadorErro,
};

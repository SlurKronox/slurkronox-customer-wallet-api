const { ErroHttp } = require('./erros');
const { naoEncontrado, tratadorErro, requestId } = require('./intermediarios');
const { sucesso } = require('./resposta');
const logger = require('./logger');

module.exports = {
  ErroHttp,
  naoEncontrado,
  tratadorErro,
  requestId,
  sucesso,
  logger,
};

const { ErroHttp } = require('../erros');
const logger = require('../logger');

function tratadorErro(err, req, res, _next) {
  const status = err instanceof ErroHttp && err.status ? err.status : 500;
  const mensagem = status >= 500
    ? 'Erro interno do servidor'
    : (err && err.message ? err.message : 'Erro interno do servidor');

  const payload = {
    mensagem,
    requestId: req.requestId,
  };

  if (err instanceof ErroHttp && err.detalhes) {
    payload.detalhes = err.detalhes;
  }

  if (status >= 500) {
    logger.error('Erro nao tratado na requisicao', {
      requestId: req.requestId,
      metodo: req.method,
      rota: req.originalUrl,
      erro: err && err.message ? err.message : 'Sem mensagem',
      stack: err && err.stack ? err.stack : undefined,
    });
  }

  res.status(status).json(payload);
}

module.exports = { tratadorErro };

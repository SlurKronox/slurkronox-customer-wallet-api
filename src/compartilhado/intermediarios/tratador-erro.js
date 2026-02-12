const { ErroHttp } = require('../erros');

function tratadorErro(err, req, res, next) {
  const status = err instanceof ErroHttp && err.status ? err.status : 500;
  const payload = {
    mensagem: err && err.message ? err.message : 'Erro interno do servidor',
  };

  if (err instanceof ErroHttp && err.detalhes) {
    payload.detalhes = err.detalhes;
  }

  res.status(status).json(payload);
}

module.exports = { tratadorErro };

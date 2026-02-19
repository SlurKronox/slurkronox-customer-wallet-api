const { randomUUID } = require('node:crypto');

function requestId(req, res, next) {
  const valorCabecalho = req.headers['x-request-id'];
  const id = typeof valorCabecalho === 'string' && valorCabecalho.trim()
    ? valorCabecalho.trim()
    : randomUUID();

  req.requestId = id;
  res.setHeader('x-request-id', id);
  next();
}

module.exports = { requestId };

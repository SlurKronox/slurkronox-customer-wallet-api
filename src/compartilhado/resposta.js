function sucesso(res, status, dados, meta) {
  const payload = { dados };

  if (meta && typeof meta === 'object') {
    payload.meta = meta;
  }

  return res.status(status).json(payload);
}

module.exports = { sucesso };

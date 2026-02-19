function naoEncontrado(req, res) {
  res.status(404).json({
    mensagem: 'Nao encontrado',
    requestId: req.requestId,
  });
}

module.exports = { naoEncontrado };

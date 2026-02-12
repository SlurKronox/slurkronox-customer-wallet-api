function naoEncontrado(req, res, next) {
  res.status(404).json({ mensagem: 'Nao encontrado' });
}

module.exports = { naoEncontrado };

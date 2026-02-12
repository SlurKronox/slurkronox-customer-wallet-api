const { usuariosServico } = require('../services');
const { ErroHttp } = require('../../compartilhado');

function parsearIdUsuario(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroHttp(400, 'Id de usuario invalido');
  }
  return id;
}

function listarUsuarios(req, res, next) {
  try {
    const usuarios = usuariosServico.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    next(err);
  }
}

function obterUsuario(req, res, next) {
  try {
    const id = parsearIdUsuario(req);
    const usuario = usuariosServico.obterUsuarioPorId(id);
    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
}

function criarUsuario(req, res, next) {
  try {
    const usuario = usuariosServico.criarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
}

function atualizarUsuario(req, res, next) {
  try {
    const id = parsearIdUsuario(req);
    const usuario = usuariosServico.atualizarUsuario(id, req.body);
    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
}

function atualizarParcialUsuario(req, res, next) {
  try {
    const id = parsearIdUsuario(req);
    const usuario = usuariosServico.atualizarParcialUsuario(id, req.body);
    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
}

function excluirUsuario(req, res, next) {
  try {
    const id = parsearIdUsuario(req);
    usuariosServico.excluirUsuario(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarUsuarios,
  obterUsuario,
  criarUsuario,
  atualizarUsuario,
  atualizarParcialUsuario,
  excluirUsuario,
};

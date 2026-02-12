const { usuariosRepositorio } = require('../data');
const { ErroHttp } = require('../../compartilhado');
const {
  validarCriacaoUsuario,
  validarAtualizacaoUsuario,
  validarAtualizacaoParcialUsuario,
} = require('../validators');

function listarUsuarios() {
  return usuariosRepositorio.listar();
}

function obterUsuarioPorId(id) {
  const usuario = usuariosRepositorio.obterPorId(id);
  if (!usuario) {
    throw new ErroHttp(404, 'Usuario nao encontrado');
  }
  return usuario;
}

function criarUsuario(payload) {
  const { valido, erros, dados } = validarCriacaoUsuario(payload);
  if (!valido) {
    throw new ErroHttp(400, 'Erro de validacao', erros);
  }

  if (usuariosRepositorio.obterPorEmail(dados.email)) {
    throw new ErroHttp(409, 'Email ja esta em uso');
  }

  return usuariosRepositorio.criar(dados);
}

function atualizarUsuario(id, payload) {
  const { valido, erros, dados } = validarAtualizacaoUsuario(payload);
  if (!valido) {
    throw new ErroHttp(400, 'Erro de validacao', erros);
  }

  const existente = usuariosRepositorio.obterPorId(id);
  if (!existente) {
    throw new ErroHttp(404, 'Usuario nao encontrado');
  }

  if (dados.email && dados.email !== existente.email) {
    if (usuariosRepositorio.obterPorEmail(dados.email)) {
      throw new ErroHttp(409, 'Email ja esta em uso');
    }
  }

  return usuariosRepositorio.substituir(id, dados);
}

function atualizarParcialUsuario(id, payload) {
  const { valido, erros, dados } = validarAtualizacaoParcialUsuario(payload);
  if (!valido) {
    throw new ErroHttp(400, 'Erro de validacao', erros);
  }

  const existente = usuariosRepositorio.obterPorId(id);
  if (!existente) {
    throw new ErroHttp(404, 'Usuario nao encontrado');
  }

  if (dados.email && dados.email !== existente.email) {
    if (usuariosRepositorio.obterPorEmail(dados.email)) {
      throw new ErroHttp(409, 'Email ja esta em uso');
    }
  }

  return usuariosRepositorio.atualizarParcial(id, dados);
}

function excluirUsuario(id) {
  const deletado = usuariosRepositorio.remover(id);
  if (!deletado) {
    throw new ErroHttp(404, 'Usuario nao encontrado');
  }

  return true;
}

module.exports = {
  listarUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  atualizarParcialUsuario,
  excluirUsuario,
};

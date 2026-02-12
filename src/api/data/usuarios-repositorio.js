const usuarios = [];
let proximoId = 1;

function listar() {
  return [...usuarios];
}

function obterPorId(id) {
  return usuarios.find((usuario) => usuario.id === id) || null;
}

function obterPorEmail(email) {
  const normalizado = email.toLowerCase();
  return usuarios.find((usuario) => usuario.email.toLowerCase() === normalizado) || null;
}

function criar(dados) {
  const agora = new Date().toISOString();
  const usuario = {
    id: proximoId++,
    criadoEm: agora,
    atualizadoEm: agora,
    ...dados,
  };
  usuarios.push(usuario);
  return usuario;
}

function substituir(id, dados) {
  const indice = usuarios.findIndex((usuario) => usuario.id === id);
  if (indice === -1) {
    return null;
  }

  const agora = new Date().toISOString();
  const usuario = {
    ...usuarios[indice],
    ...dados,
    id,
    atualizadoEm: agora,
  };

  usuarios[indice] = usuario;
  return usuario;
}

function atualizarParcial(id, dados) {
  const indice = usuarios.findIndex((usuario) => usuario.id === id);
  if (indice === -1) {
    return null;
  }

  const agora = new Date().toISOString();
  const usuario = {
    ...usuarios[indice],
    ...dados,
    id,
    atualizadoEm: agora,
  };

  usuarios[indice] = usuario;
  return usuario;
}

function remover(id) {
  const indice = usuarios.findIndex((usuario) => usuario.id === id);
  if (indice === -1) {
    return false;
  }

  usuarios.splice(indice, 1);
  return true;
}

module.exports = {
  listar,
  obterPorId,
  obterPorEmail,
  criar,
  substituir,
  atualizarParcial,
  remover,
};

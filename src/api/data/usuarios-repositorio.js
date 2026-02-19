const usuarios = [];
let proximoId = 1;

function listar() {
  return usuarios.map((usuario) => ({ ...usuario }));
}

function obterPorId(id) {
  const usuario = usuarios.find((item) => item.id === id);
  return usuario ? { ...usuario } : null;
}

function obterPorEmail(email) {
  const normalizado = email.toLowerCase();
  const usuario = usuarios.find((item) => item.email.toLowerCase() === normalizado);
  return usuario ? { ...usuario } : null;
}

function criar(dados) {
  const agora = new Date().toISOString();
  const usuario = {
    ...dados,
    id: proximoId++,
    criadoEm: agora,
    atualizadoEm: agora,
  };
  usuarios.push(usuario);
  return { ...usuario };
}

function substituir(id, dados) {
  const indice = usuarios.findIndex((usuario) => usuario.id === id);
  if (indice === -1) {
    return null;
  }

  const atual = usuarios[indice];
  const agora = new Date().toISOString();
  const usuario = {
    ...atual,
    ...dados,
    id,
    criadoEm: atual.criadoEm,
    atualizadoEm: agora,
  };

  usuarios[indice] = usuario;
  return { ...usuario };
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
    criadoEm: usuarios[indice].criadoEm,
    atualizadoEm: agora,
  };

  usuarios[indice] = usuario;
  return { ...usuario };
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ehObjetoSimples(valor) {
  return valor !== null && typeof valor === 'object' && !Array.isArray(valor);
}

function normalizarTexto(valor) {
  if (typeof valor !== 'string') {
    return null;
  }
  const texto = valor.trim();
  return texto.length > 0 ? texto : null;
}

function temPropriedade(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function validarCriacaoUsuario(payload) {
  const erros = [];
  const dados = {};

  if (!ehObjetoSimples(payload)) {
    return {
      valido: false,
      erros: [{ campo: 'body', mensagem: 'Payload invalido' }],
      dados,
    };
  }

  const nome = normalizarTexto(payload.nome);
  if (!nome) {
    erros.push({ campo: 'nome', mensagem: 'Nome e obrigatorio' });
  } else {
    dados.nome = nome;
  }

  const email = normalizarTexto(payload.email);
  if (!email) {
    erros.push({ campo: 'email', mensagem: 'Email e obrigatorio' });
  } else if (!EMAIL_REGEX.test(email)) {
    erros.push({ campo: 'email', mensagem: 'Email invalido' });
  } else {
    dados.email = email.toLowerCase();
  }

  if (temPropriedade(payload, 'papel')) {
    const papel = normalizarTexto(payload.papel);
    if (!papel) {
      erros.push({ campo: 'papel', mensagem: 'Papel deve ser texto nao vazio' });
    } else {
      dados.papel = papel;
    }
  } else {
    dados.papel = 'usuario';
  }

  if (temPropriedade(payload, 'ativo')) {
    if (typeof payload.ativo !== 'boolean') {
      erros.push({ campo: 'ativo', mensagem: 'Ativo deve ser booleano' });
    } else {
      dados.ativo = payload.ativo;
    }
  } else {
    dados.ativo = true;
  }

  return {
    valido: erros.length === 0,
    erros,
    dados,
  };
}

function validarAtualizacaoUsuario(payload) {
  const erros = [];
  const dados = {};

  if (!ehObjetoSimples(payload)) {
    return {
      valido: false,
      erros: [{ campo: 'body', mensagem: 'Payload invalido' }],
      dados,
    };
  }

  const nome = normalizarTexto(payload.nome);
  if (!nome) {
    erros.push({ campo: 'nome', mensagem: 'Nome e obrigatorio' });
  } else {
    dados.nome = nome;
  }

  const email = normalizarTexto(payload.email);
  if (!email) {
    erros.push({ campo: 'email', mensagem: 'Email e obrigatorio' });
  } else if (!EMAIL_REGEX.test(email)) {
    erros.push({ campo: 'email', mensagem: 'Email invalido' });
  } else {
    dados.email = email.toLowerCase();
  }

  if (temPropriedade(payload, 'papel')) {
    const papel = normalizarTexto(payload.papel);
    if (!papel) {
      erros.push({ campo: 'papel', mensagem: 'Papel deve ser texto nao vazio' });
    } else {
      dados.papel = papel;
    }
  }

  if (temPropriedade(payload, 'ativo')) {
    if (typeof payload.ativo !== 'boolean') {
      erros.push({ campo: 'ativo', mensagem: 'Ativo deve ser booleano' });
    } else {
      dados.ativo = payload.ativo;
    }
  }

  return {
    valido: erros.length === 0,
    erros,
    dados,
  };
}

function validarAtualizacaoParcialUsuario(payload) {
  const erros = [];
  const dados = {};

  if (!ehObjetoSimples(payload)) {
    return {
      valido: false,
      erros: [{ campo: 'body', mensagem: 'Payload invalido' }],
      dados,
    };
  }

  const temAlgum = ['nome', 'email', 'papel', 'ativo'].some((campo) => temPropriedade(payload, campo));
  if (!temAlgum) {
    erros.push({ campo: 'body', mensagem: 'Informe pelo menos um campo' });
  }

  if (temPropriedade(payload, 'nome')) {
    const nome = normalizarTexto(payload.nome);
    if (!nome) {
      erros.push({ campo: 'nome', mensagem: 'Nome deve ser texto nao vazio' });
    } else {
      dados.nome = nome;
    }
  }

  if (temPropriedade(payload, 'email')) {
    const email = normalizarTexto(payload.email);
    if (!email) {
      erros.push({ campo: 'email', mensagem: 'Email deve ser texto nao vazio' });
    } else if (!EMAIL_REGEX.test(email)) {
      erros.push({ campo: 'email', mensagem: 'Email invalido' });
    } else {
      dados.email = email.toLowerCase();
    }
  }

  if (temPropriedade(payload, 'papel')) {
    const papel = normalizarTexto(payload.papel);
    if (!papel) {
      erros.push({ campo: 'papel', mensagem: 'Papel deve ser texto nao vazio' });
    } else {
      dados.papel = papel;
    }
  }

  if (temPropriedade(payload, 'ativo')) {
    if (typeof payload.ativo !== 'boolean') {
      erros.push({ campo: 'ativo', mensagem: 'Ativo deve ser booleano' });
    } else {
      dados.ativo = payload.ativo;
    }
  }

  return {
    valido: erros.length === 0,
    erros,
    dados,
  };
}

module.exports = {
  validarCriacaoUsuario,
  validarAtualizacaoUsuario,
  validarAtualizacaoParcialUsuario,
};

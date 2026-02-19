const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CAMPOS_ATUALIZAVEIS = [
  'name',
  'email',
  'parentId',
  'birthDate',
  'cellphone',
  'phone',
  'occupation',
  'state',
];

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

function normalizarEstado(valor) {
  const estado = normalizarTexto(valor);
  if (!estado) {
    return null;
  }

  return estado.toUpperCase();
}

function temPropriedade(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function validarCampoEmail(payload, erros, dados, obrigatorio) {
  if (!temPropriedade(payload, 'email')) {
    if (obrigatorio) {
      erros.push({ campo: 'email', mensagem: 'Email e obrigatorio' });
    }
    return;
  }

  const email = normalizarTexto(payload.email);
  if (!email) {
    erros.push({ campo: 'email', mensagem: 'Email deve ser texto nao vazio' });
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    erros.push({ campo: 'email', mensagem: 'Email invalido' });
    return;
  }

  dados.email = email.toLowerCase();
}

function validarCampoName(payload, erros, dados, obrigatorio) {
  if (!temPropriedade(payload, 'name')) {
    if (obrigatorio) {
      erros.push({ campo: 'name', mensagem: 'Nome e obrigatorio' });
    }
    return;
  }

  const name = normalizarTexto(payload.name);
  if (!name) {
    erros.push({ campo: 'name', mensagem: 'Nome deve ser texto nao vazio' });
    return;
  }

  dados.name = name;
}

function validarCampoId(payload, erros, dados) {
  if (!temPropriedade(payload, 'id')) {
    return;
  }

  const id = normalizarTexto(payload.id);
  if (!id) {
    erros.push({ campo: 'id', mensagem: 'Id deve ser texto nao vazio' });
    return;
  }

  dados.id = id;
}

function validarCampoBirthDate(payload, erros, dados) {
  if (!temPropriedade(payload, 'birthDate')) {
    return;
  }

  const birthDate = normalizarTexto(payload.birthDate);
  if (!birthDate) {
    erros.push({ campo: 'birthDate', mensagem: 'birthDate deve ser texto nao vazio' });
    return;
  }

  const data = new Date(birthDate);
  if (Number.isNaN(data.getTime())) {
    erros.push({ campo: 'birthDate', mensagem: 'birthDate invalido' });
    return;
  }

  dados.birthDate = data.toISOString();
}

function validarCampoTextoOpcional(payload, campo, erros, dados) {
  if (!temPropriedade(payload, campo)) {
    return;
  }

  const valor = normalizarTexto(payload[campo]);
  if (!valor) {
    erros.push({ campo, mensagem: `${campo} deve ser texto nao vazio` });
    return;
  }

  dados[campo] = valor;
}

function validarCampoState(payload, erros, dados) {
  if (!temPropriedade(payload, 'state')) {
    return;
  }

  const state = normalizarEstado(payload.state);
  if (!state || state.length !== 2) {
    erros.push({ campo: 'state', mensagem: 'state deve ter 2 letras' });
    return;
  }

  dados.state = state;
}

function validarCamposOpcionais(payload, erros, dados) {
  validarCampoTextoOpcional(payload, 'parentId', erros, dados);
  validarCampoBirthDate(payload, erros, dados);
  validarCampoTextoOpcional(payload, 'cellphone', erros, dados);
  validarCampoTextoOpcional(payload, 'phone', erros, dados);
  validarCampoTextoOpcional(payload, 'occupation', erros, dados);
  validarCampoState(payload, erros, dados);
}

function validarCriacaoCustomer(payload) {
  const erros = [];
  const dados = {};

  if (!ehObjetoSimples(payload)) {
    return {
      valido: false,
      erros: [{ campo: 'body', mensagem: 'Payload invalido' }],
      dados,
    };
  }

  validarCampoId(payload, erros, dados);
  validarCampoName(payload, erros, dados, true);
  validarCampoEmail(payload, erros, dados, true);
  validarCamposOpcionais(payload, erros, dados);

  return {
    valido: erros.length === 0,
    erros,
    dados,
  };
}

function validarAtualizacaoCustomer(payload) {
  const erros = [];
  const dados = {};

  if (!ehObjetoSimples(payload)) {
    return {
      valido: false,
      erros: [{ campo: 'body', mensagem: 'Payload invalido' }],
      dados,
    };
  }

  validarCampoName(payload, erros, dados, true);
  validarCampoEmail(payload, erros, dados, true);
  validarCamposOpcionais(payload, erros, dados);

  return {
    valido: erros.length === 0,
    erros,
    dados,
  };
}

function validarAtualizacaoParcialCustomer(payload) {
  const erros = [];
  const dados = {};

  if (!ehObjetoSimples(payload)) {
    return {
      valido: false,
      erros: [{ campo: 'body', mensagem: 'Payload invalido' }],
      dados,
    };
  }

  const temAlgumCampo = CAMPOS_ATUALIZAVEIS.some((campo) => temPropriedade(payload, campo));
  if (!temAlgumCampo) {
    erros.push({ campo: 'body', mensagem: 'Informe pelo menos um campo' });
  }

  validarCampoName(payload, erros, dados, false);
  validarCampoEmail(payload, erros, dados, false);
  validarCamposOpcionais(payload, erros, dados);

  return {
    valido: erros.length === 0,
    erros,
    dados,
  };
}

module.exports = {
  validarCriacaoCustomer,
  validarAtualizacaoCustomer,
  validarAtualizacaoParcialCustomer,
};

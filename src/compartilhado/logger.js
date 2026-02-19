function formatarContexto(contexto) {
  if (!contexto || typeof contexto !== 'object') {
    return '';
  }

  try {
    return ` ${JSON.stringify(contexto)}`;
  } catch (erro) {
    return '';
  }
}

function logar(nivel, mensagem, contexto) {
  const timestamp = new Date().toISOString();
  const prefixo = `[${timestamp}] [${nivel}]`;
  const linha = `${prefixo} ${mensagem}${formatarContexto(contexto)}`;

  if (nivel === 'ERROR') {
    console.error(linha);
    return;
  }

  if (nivel === 'WARN') {
    console.warn(linha);
    return;
  }

  console.log(linha);
}

function info(mensagem, contexto) {
  logar('INFO', mensagem, contexto);
}

function warn(mensagem, contexto) {
  logar('WARN', mensagem, contexto);
}

function error(mensagem, contexto) {
  logar('ERROR', mensagem, contexto);
}

module.exports = {
  info,
  warn,
  error,
};

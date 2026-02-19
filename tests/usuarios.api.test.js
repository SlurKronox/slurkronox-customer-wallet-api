const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

const { aplicacao } = require('../src/aplicacao');

function obterBaseUrl(servidor) {
  const endereco = servidor.address();
  return `http://127.0.0.1:${endereco.port}`;
}

test('deve executar fluxo basico de usuarios', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);

    const listaInicial = await fetch(`${baseUrl}/api/v1/usuarios`);
    assert.equal(listaInicial.status, 200);
    const listaPayload = await listaInicial.json();
    assert.ok(Array.isArray(listaPayload.dados));
    assert.equal(typeof listaPayload.meta.total, 'number');

    const criacao = await fetch(`${baseUrl}/api/v1/usuarios`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nome: 'Ana', email: 'ana@empresa.com' }),
    });
    assert.equal(criacao.status, 201);
    const usuarioCriadoPayload = await criacao.json();
    const usuario = usuarioCriadoPayload.dados;
    assert.equal(usuario.nome, 'Ana');

    const busca = await fetch(`${baseUrl}/api/v1/usuarios/${usuario.id}`);
    assert.equal(busca.status, 200);
    const usuarioBuscadoPayload = await busca.json();
    assert.equal(usuarioBuscadoPayload.dados.id, usuario.id);

    const exclusao = await fetch(`${baseUrl}/api/v1/usuarios/${usuario.id}`, {
      method: 'DELETE',
    });
    assert.equal(exclusao.status, 204);
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

test('deve retornar 409 ao criar usuario com email duplicado', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);
    const payload = { nome: 'Email Duplicado', email: 'duplicado@empresa.com' };

    const primeira = await fetch(`${baseUrl}/api/v1/usuarios`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    assert.equal(primeira.status, 201);

    const segunda = await fetch(`${baseUrl}/api/v1/usuarios`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    assert.equal(segunda.status, 409);
    const erro = await segunda.json();
    assert.equal(erro.mensagem, 'Email ja esta em uso');
    assert.ok(erro.requestId);
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

test('deve retornar 400 para campo desconhecido em usuarios', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);

    const resposta = await fetch(`${baseUrl}/api/v1/usuarios`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        nome: 'Campo Invalido',
        email: 'campo.invalido@empresa.com',
        extra: 'nao permitido',
      }),
    });

    assert.equal(resposta.status, 400);
    const erro = await resposta.json();
    assert.equal(erro.mensagem, 'Erro de validacao');
    assert.ok(Array.isArray(erro.detalhes));
    assert.ok(erro.detalhes.some((item) => item.campo === 'extra'));
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

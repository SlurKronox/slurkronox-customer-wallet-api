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

    const listaInicial = await fetch(`${baseUrl}/usuarios`);
    assert.equal(listaInicial.status, 200);
    assert.ok(Array.isArray(await listaInicial.json()));

    const criacao = await fetch(`${baseUrl}/usuarios`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nome: 'Ana', email: 'ana@empresa.com' }),
    });
    assert.equal(criacao.status, 201);
    const usuario = await criacao.json();
    assert.equal(usuario.nome, 'Ana');

    const busca = await fetch(`${baseUrl}/usuarios/${usuario.id}`);
    assert.equal(busca.status, 200);

    const exclusao = await fetch(`${baseUrl}/usuarios/${usuario.id}`, {
      method: 'DELETE',
    });
    assert.equal(exclusao.status, 204);
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

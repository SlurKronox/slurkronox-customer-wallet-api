const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

const { aplicacao } = require('../src/aplicacao');
const { version } = require('../package.json');

function obterBaseUrl(servidor) {
  const endereco = servidor.address();
  return `http://127.0.0.1:${endereco.port}`;
}

test('deve responder status de saude da API', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);
    const resposta = await fetch(`${baseUrl}/api/v1/health`);

    assert.equal(resposta.status, 200);
    assert.ok(resposta.headers.get('x-request-id'));
    const payload = await resposta.json();
    const dados = payload.dados;

    assert.equal(dados.status, 'ok');
    assert.equal(dados.servico, 'kronox-customer-wallet-core');
    assert.equal(dados.versao, version);
    assert.ok(typeof dados.timestamp === 'string');
    assert.ok(dados.timestamp.includes('T'));
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

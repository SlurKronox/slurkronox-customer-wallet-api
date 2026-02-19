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
    const payload = await resposta.json();

    assert.equal(payload.status, 'ok');
    assert.equal(payload.servico, 'kronox-customer-wallet-core');
    assert.equal(payload.versao, version);
    assert.ok(typeof payload.timestamp === 'string');
    assert.ok(payload.timestamp.includes('T'));
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

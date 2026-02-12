const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

const { aplicacao } = require('../src/aplicacao');

function obterBaseUrl(servidor) {
  const endereco = servidor.address();
  return `http://127.0.0.1:${endereco.port}`;
}

test('deve listar customers e buscar por id', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);

    const lista = await fetch(`${baseUrl}/customers`);
    assert.equal(lista.status, 200);
    const payload = await lista.json();
    assert.ok(payload.customerWallets);
    assert.ok(Array.isArray(payload.customerWallets.data));
    assert.ok(payload.customerWallets.data.length > 0);

    const id = payload.customerWallets.data[0].id;
    const busca = await fetch(`${baseUrl}/customers/${id}`);
    assert.equal(busca.status, 200);
    const customer = await busca.json();
    assert.equal(customer.id, id);
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

test('deve retornar 404 quando customer nao existir', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);
    const busca = await fetch(`${baseUrl}/customers/id-inexistente`);
    assert.equal(busca.status, 404);
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

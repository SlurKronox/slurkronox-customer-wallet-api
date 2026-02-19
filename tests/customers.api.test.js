const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

const { aplicacao } = require('../src/aplicacao');

function obterBaseUrl(servidor) {
  const endereco = servidor.address();
  return `http://127.0.0.1:${endereco.port}`;
}

test('deve executar fluxo completo de customers', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);

    const listaInicial = await fetch(`${baseUrl}/api/v1/customers`);
    assert.equal(listaInicial.status, 200);
    const payloadInicial = await listaInicial.json();
    assert.ok(payloadInicial.customerWallets);
    assert.ok(Array.isArray(payloadInicial.customerWallets.data));
    assert.ok(payloadInicial.customerWallets.data.length > 0);

    const criacao = await fetch(`${baseUrl}/api/v1/customers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Cliente Teste API',
        email: 'cliente.teste.api@empresa.com',
        occupation: 'Analista',
        state: 'sp',
      }),
    });
    assert.equal(criacao.status, 201);
    const customerCriado = await criacao.json();
    assert.ok(customerCriado.id);
    assert.equal(customerCriado.name, 'Cliente Teste API');
    assert.equal(customerCriado.state, 'SP');

    const busca = await fetch(`${baseUrl}/api/v1/customers/${customerCriado.id}`);
    assert.equal(busca.status, 200);
    const customerBuscado = await busca.json();
    assert.equal(customerBuscado.id, customerCriado.id);

    const atualizacao = await fetch(`${baseUrl}/api/v1/customers/${customerCriado.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Cliente Teste Atualizado',
        email: 'cliente.teste.atualizado@empresa.com',
        occupation: 'Engenheiro',
        state: 'rj',
      }),
    });
    assert.equal(atualizacao.status, 200);
    const customerAtualizado = await atualizacao.json();
    assert.equal(customerAtualizado.name, 'Cliente Teste Atualizado');
    assert.equal(customerAtualizado.state, 'RJ');

    const parcial = await fetch(`${baseUrl}/api/v1/customers/${customerCriado.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        occupation: 'Arquiteto',
      }),
    });
    assert.equal(parcial.status, 200);
    const customerParcial = await parcial.json();
    assert.equal(customerParcial.occupation, 'Arquiteto');

    const exclusao = await fetch(`${baseUrl}/api/v1/customers/${customerCriado.id}`, {
      method: 'DELETE',
    });
    assert.equal(exclusao.status, 204);

    const buscaPosExclusao = await fetch(`${baseUrl}/api/v1/customers/${customerCriado.id}`);
    assert.equal(buscaPosExclusao.status, 404);
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
    const busca = await fetch(`${baseUrl}/api/v1/customers/id-inexistente`);
    assert.equal(busca.status, 404);

    const buscaIdInvalido = await fetch(`${baseUrl}/api/v1/customers/%20`);
    assert.equal(buscaIdInvalido.status, 400);
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

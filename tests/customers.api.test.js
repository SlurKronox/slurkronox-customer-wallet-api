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
    assert.ok(Array.isArray(payloadInicial.dados));
    assert.ok(payloadInicial.dados.length > 0);
    assert.equal(typeof payloadInicial.meta.total, 'number');

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
    const customerCriadoPayload = await criacao.json();
    const customerCriado = customerCriadoPayload.dados;
    assert.ok(customerCriado.id);
    assert.equal(customerCriado.name, 'Cliente Teste API');
    assert.equal(customerCriado.state, 'SP');

    const busca = await fetch(`${baseUrl}/api/v1/customers/${customerCriado.id}`);
    assert.equal(busca.status, 200);
    const customerBuscadoPayload = await busca.json();
    const customerBuscado = customerBuscadoPayload.dados;
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
    const customerAtualizadoPayload = await atualizacao.json();
    const customerAtualizado = customerAtualizadoPayload.dados;
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
    const customerParcialPayload = await parcial.json();
    const customerParcial = customerParcialPayload.dados;
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

test('deve retornar erros de validacao de customers', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);
    const busca = await fetch(`${baseUrl}/api/v1/customers/id-inexistente`);
    assert.equal(busca.status, 404);

    const buscaIdInvalido = await fetch(`${baseUrl}/api/v1/customers/%20`);
    assert.equal(buscaIdInvalido.status, 400);

    const campoDesconhecido = await fetch(`${baseUrl}/api/v1/customers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Campo Invalido',
        email: 'campo.invalido@empresa.com',
        campoNaoPermitido: 'x',
      }),
    });
    assert.equal(campoDesconhecido.status, 400);
    const corpoErro = await campoDesconhecido.json();
    assert.ok(Array.isArray(corpoErro.detalhes));
    assert.ok(corpoErro.detalhes.some((item) => item.campo === 'campoNaoPermitido'));
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

test('deve retornar 409 para id e email duplicados em customers', async () => {
  const servidor = aplicacao.listen(0);
  await once(servidor, 'listening');

  try {
    const baseUrl = obterBaseUrl(servidor);

    const respostaIdDuplicado = await fetch(`${baseUrl}/api/v1/customers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: '5da9ea674234635bdff45c02',
        name: 'Duplicado',
        email: 'duplicado@empresa.com',
      }),
    });

    assert.equal(respostaIdDuplicado.status, 409);
    const corpoId = await respostaIdDuplicado.json();
    assert.equal(corpoId.mensagem, 'Id de customer ja existe');

    const primeiro = await fetch(`${baseUrl}/api/v1/customers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Primeiro',
        email: 'email.repetido@empresa.com',
      }),
    });
    assert.equal(primeiro.status, 201);

    const segundo = await fetch(`${baseUrl}/api/v1/customers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Segundo',
        email: 'email.repetido@empresa.com',
      }),
    });
    assert.equal(segundo.status, 409);
    const corpoEmail = await segundo.json();
    assert.equal(corpoEmail.mensagem, 'Email de customer ja esta em uso');
  } finally {
    servidor.close();
    await once(servidor, 'close');
  }
});

# Arquitetura

## Estilo adotado

A API segue arquitetura em camadas com responsabilidades bem separadas:

- `routes`: mapeamento de endpoints HTTP.
- `controllers`: adaptacao de HTTP para chamadas de dominio.
- `services`: regras de negocio e orquestracao.
- `validators`: validacao e normalizacao de payload.
- `data`: persistencia em memoria e acesso a dados de referencia.
- `compartilhado`: erros customizados e middlewares globais.

## Fluxo de requisicao

1. Requisicao entra por `src/servidor.js`.
2. `src/aplicacao.js` aplica middlewares e registra `/api/v1`.
3. `src/api/rotas-api.js` encaminha para modulo de rota.
4. Controller valida parametros de rota e chama service.
5. Service aplica regras de negocio e validadores.
6. Repositorio (`data`) retorna ou persiste dados em memoria.
7. Em excecao, middlewares globais padronizam resposta de erro.

## Modulos funcionais

### Health

- Rota: `src/api/routes/health.js`
- Controller: `src/api/controllers/health-controlador.js`
- Responsabilidade: verificar disponibilidade da API e metadados de execucao.

### Usuarios

- Rota: `src/api/routes/usuarios-rotas.js`
- Controller: `src/api/controllers/usuarios-controlador.js`
- Service: `src/api/services/usuarios-servico.js`
- Validator: `src/api/validators/usuarios-validador.js`
- Repositorio: `src/api/data/usuarios-repositorio.js`

### Customers

- Rota: `src/api/routes/customers.js`
- Controller: `src/api/controllers/customers.js`
- Service: `src/api/services/customers-servico.js`
- Validator: `src/api/validators/customers-validador.js`
- Repositorio: `src/api/data/customers-repositorio.js`
- Base inicial: `src/api/data/referencias/customer-wallets.json`

## Tratamento de erros

- Classe de erro HTTP: `src/compartilhado/erros/erro-http.js`
- Middleware 404: `src/compartilhado/intermediarios/nao-encontrado.js`
- Middleware global: `src/compartilhado/intermediarios/tratador-erro.js`

Formato de erro:

```json
{
  "mensagem": "Descricao do erro",
  "detalhes": []
}
```

## Configuracao e bootstrap

- Config de porta: `src/config/servidor.config.js`
- Instancia Express: `src/config/express.js`
- Config default: `src/config/default.json`

Resolucao de porta:

1. `process.env.PORT`
2. `server.port` no config
3. fallback `3000`

Fallback de conflito de porta:

- Sem `PORT` fixa, tenta automaticamente ate `3020`.
- Com `PORT` fixa, encerra com erro.

## Limites atuais

- Sem banco de dados (estado em memoria).
- Sem autenticacao/autorizacao.
- Sem observabilidade estruturada (metrics/tracing).

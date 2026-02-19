# Arquitetura da API

## Visao geral

A API adota arquitetura em camadas para manter separacao de responsabilidades:

- `routes`: definicao de rotas HTTP.
- `controllers`: adaptacao da entrada HTTP e resposta.
- `services`: regras de negocio.
- `validators`: validacao e normalizacao de payload.
- `data`: persistencia em memoria.
- `compartilhado`: infraestrutura transversal (erros, logger, middlewares, resposta).

## Fluxo de requisicao

1. `src/servidor.js` inicializa o app e controla ciclo de vida.
2. `src/config/express.js` aplica middlewares de seguranca e parse.
3. `src/aplicacao.js` registra rotas em `/api/v1`.
4. Rota chama controller.
5. Controller chama service.
6. Service valida, aplica regras e chama repositorio.
7. Resposta retorna no contrato padrao (`dados`/`meta`).

## Contratos

- Sucesso: `{ dados, meta? }`
- Erro: `{ mensagem, requestId, detalhes? }`

## Seguranca aplicada

- `helmet` para headers de seguranca.
- `express-rate-limit` para limitacao por IP.
- `requestId` para rastreabilidade de requisicoes.
- ocultacao de mensagens internas em erro `500`.

## Modulos

### Health

- Rota: `src/api/routes/health.js`
- Controller: `src/api/controllers/health-controlador.js`

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
- Carga inicial: `src/api/data/referencias/customer-wallets.json`

## Configuracao

- Porta: `src/config/default.json -> server.port`
- Rate limit: `src/config/default.json -> security.rateLimit`

## Limites atuais

- Persistencia em memoria (nao persistente).
- Sem autenticacao/autorizacao.
- Sem banco de dados.

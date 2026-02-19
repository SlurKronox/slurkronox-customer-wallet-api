# Estrategia de Testes

## Stack

- `node:test` (runner)
- `node:assert/strict` (assertivas)
- `fetch` nativo para chamadas HTTP

## Suites atuais

- `tests/health.api.test.js`
- `tests/usuarios.api.test.js`
- `tests/customers.api.test.js`

## Cobertura atual

### Health

- `GET /health` (`200`)
- validacao de contrato e `x-request-id`

### Usuarios

- fluxo basico CRUD (`GET`, `POST`, `GET/:id`, `DELETE`)
- conflito de email (`409`)
- validacao de campo desconhecido (`400`)

### Customers

- fluxo completo CRUD (`GET`, `POST`, `GET/:id`, `PUT`, `PATCH`, `DELETE`)
- `404` para id inexistente
- `400` para id invalido
- `400` para campo desconhecido
- `409` para id duplicado
- `409` para email duplicado

## Execucao

```bash
npm test
```

## Smoke test de integracao

Collection Postman:

- `postman/Kronox-Customer-Wallet-Core.postman_collection.json`

Environment:

- `postman/Kronox-Customer-Wallet-Core.postman_environment.json`

Execucao:

```bash
npm run test:postman
```

## Proximos passos recomendados

- adicionar testes de carga
- adicionar testes de concorrencia
- adicionar testes com banco real quando houver persistencia

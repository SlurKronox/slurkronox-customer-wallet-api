# Estrategia de Testes

## Stack de testes

- Runner: `node:test`
- Assertivas: `node:assert/strict`
- HTTP client: `fetch` nativo do Node

## Suites atuais

- `tests/health.api.test.js`
- `tests/usuarios.api.test.js`
- `tests/customers.api.test.js`

## Cobertura funcional atual

### Health

- `GET /api/v1/health` retorna `200` e payload esperado.

### Usuarios

- listagem inicial
- criacao
- busca por id
- exclusao

### Customers

- listagem
- criacao
- busca por id
- atualizacao completa (PUT)
- atualizacao parcial (PATCH)
- exclusao
- cenarios negativos (`404` e id invalido)

## Como executar

```bash
npm test
```

## Smoke test via Postman/Newman

Collection:

- `postman/Kronox-Customer-Wallet-Core.postman_collection.json`

Environment:

- `postman/Kronox-Customer-Wallet-Core.postman_environment.json`

Execucao manual:

```bash
npx --yes newman run postman/Kronox-Customer-Wallet-Core.postman_collection.json -e postman/Kronox-Customer-Wallet-Core.postman_environment.json
```

## Gaps planejados

- testes de validacao detalhada para todos os campos opcionais
- testes de carga e concorrencia
- cobertura de observabilidade (quando existir logging estruturado)

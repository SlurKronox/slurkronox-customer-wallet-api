# Kronox Customer Wallet Core API

API REST em Node.js + Express para gerenciamento de usuarios e customers, com
foco em simplicidade, seguranca basica e organizacao por camadas.

## Sumario

- [Visao geral](#visao-geral)
- [Stack tecnica](#stack-tecnica)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Executando localmente](#executando-localmente)
- [Seguranca e confiabilidade](#seguranca-e-confiabilidade)
- [Contrato de resposta](#contrato-de-resposta)
- [Endpoints](#endpoints)
- [Testes](#testes)
- [Postman](#postman)
- [Documentacao completa](#documentacao-completa)

## Visao geral

Principais capacidades da API:

- CRUD completo de usuarios em memoria.
- CRUD completo de customers em memoria (com carga inicial por JSON de referencia).
- Healthcheck em `GET /api/v1/health`.
- Validacao de payload com bloqueio de campos desconhecidos.
- Erros HTTP padronizados com `requestId`.

## Stack tecnica

- Node.js (CommonJS)
- Express
- `config`
- `helmet`
- `express-rate-limit`
- `node:test` para testes automatizados

## Estrutura do projeto

```text
src/
  aplicacao.js
  servidor.js
  api/
    rotas-api.js
    routes/
    controllers/
    services/
    data/
      referencias/
    validators/
  compartilhado/
    erros/
    intermediarios/
  config/
tests/
postman/
docs/
```

## Executando localmente

### Instalar dependencias

```bash
npm install
```

### Modo desenvolvimento

```bash
npm run dev
```

### Modo normal

```bash
npm start
```

### Rodar testes

```bash
npm test
```

## Seguranca e confiabilidade

- `helmet` habilitado para headers de seguranca.
- Rate limit habilitado por IP.
- `x-request-id` em todas as respostas.
- Tratamento de erro com mensagem segura para `500`.
- Graceful shutdown em `SIGINT` e `SIGTERM`.
- Fallback de porta quando `EADDRINUSE` e `PORT` nao esta fixa.

## Contrato de resposta

Sucesso:

```json
{
  "dados": {},
  "meta": {
    "total": 1
  }
}
```

`meta` aparece em endpoints de listagem.

Erro:

```json
{
  "mensagem": "Descricao do erro",
  "requestId": "uuid",
  "detalhes": []
}
```

`detalhes` e opcional e aparece em validacoes.

## Endpoints

Base URL local:

- `http://localhost:3000/api/v1`

Rotas:

- `GET /health`
- `GET /usuarios`
- `GET /usuarios/:id`
- `POST /usuarios`
- `PUT /usuarios/:id`
- `PATCH /usuarios/:id`
- `DELETE /usuarios/:id`
- `GET /customers`
- `GET /customers/:id`
- `POST /customers`
- `PUT /customers/:id`
- `PATCH /customers/:id`
- `DELETE /customers/:id`

## Testes

- Suite automatizada: `npm test`
- Colecao Postman via CLI: `npm run test:postman`

## Postman

Arquivos:

- `postman/Kronox-Customer-Wallet-Core.postman_collection.json`
- `postman/Kronox-Customer-Wallet-Core.postman_environment.json`
- Tutorial detalhado: `docs/POSTMAN-TUTORIAL.md`

Passos:

1. Importe collection e environment.
2. Ajuste `baseUrl` conforme a porta ativa.
3. Deixe a API em execucao (`npm start` ou `npm run dev`).
4. Execute a collection na ordem.

## Documentacao completa

- `docs/README.md`
- `docs/API.md`
- `docs/POSTMAN-TUTORIAL.md`
- `docs/openapi.yaml`
- `docs/ARQUITETURA.md`
- `docs/OPERACAO.md`
- `docs/TESTES.md`
- `SECURITY.md`
- `CHANGELOG.md`

# Kronox Customer Wallet Core API

API REST em Node.js + Express para gerenciamento de usuarios e customers,
com arquitetura em camadas, validacao de dados e documentacao tecnica.

## Sumario

- [Visao geral](#visao-geral)
- [Tecnologias](#tecnologias)
- [Estrutura](#estrutura)
- [Como executar](#como-executar)
- [Testes](#testes)
- [Configuracao](#configuracao)
- [API (v1)](#api-v1)
- [Postman](#postman)
- [Documentacao](#documentacao)
- [Qualidade e governanca](#qualidade-e-governanca)

## Visao geral

Principais entregas do projeto:

- CRUD completo de usuarios (memoria).
- CRUD completo de customers (memoria com carga inicial de JSON).
- Endpoint de healthcheck (`GET /api/v1/health`).
- Tratamento de erros HTTP padronizado.
- Testes automatizados de API com `node:test`.
- Colecao Postman para validacao ponta a ponta.

## Tecnologias

- Node.js (CommonJS)
- Express
- body-parser
- config
- nodemon
- node:test

## Estrutura

```text
src/
  aplicacao.js
  servidor.js
  api/
    rotas-api.js
    routes/
      health.js
      usuarios-rotas.js
      customers.js
      index.js
    controllers/
      health-controlador.js
      usuarios-controlador.js
      customers.js
      index.js
    services/
      usuarios-servico.js
      customers-servico.js
      index.js
    data/
      usuarios-repositorio.js
      customers-repositorio.js
      index.js
      referencias/
        customer-wallets.json
        materiais-tcc.md
    validators/
      usuarios-validador.js
      customers-validador.js
      index.js
  config/
    default.json
    servidor.config.js
    express.js
    index.js
  compartilhado/
    erros/
    intermediarios/
tests/
postman/
docs/
```

## Como executar

### 1) Instalar dependencias

```bash
npm install
```

### 2) Ambiente de desenvolvimento (hot reload)

```bash
npm run dev
```

### 3) Ambiente normal

```bash
npm start
```

## Testes

Executar suite automatizada:

```bash
npm test
```

Executar collection Postman (com API em execucao):

```bash
npm run test:postman
```

## Configuracao

Arquivo base:

- `src/config/default.json`

Chave de porta:

- `server.port`

Prioridade da porta:

1. `process.env.PORT` (se valida)
2. `server.port` do config
3. fallback `3000`

Comportamento em `EADDRINUSE`:

- Sem `PORT` fixa: tenta automaticamente proxima porta ate `3020`.
- Com `PORT` fixa: encerra com erro e orientacao no console.

## API (v1)

Base URL local:

- `http://localhost:3000/api/v1`

Endpoints:

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

## Postman

Arquivos:

- `postman/Kronox-Customer-Wallet-Core.postman_collection.json`
- `postman/Kronox-Customer-Wallet-Core.postman_environment.json`

Passos:

1. Importe collection e environment.
2. Selecione o environment local.
3. Ajuste `baseUrl` para a porta atual do servidor.
4. Execute a collection na ordem para cenarios completos.

## Documentacao

- `docs/README.md` (indice)
- `docs/API.md` (referencia funcional)
- `docs/openapi.yaml` (especificacao OpenAPI 3.0)
- `docs/ARQUITETURA.md`
- `docs/OPERACAO.md`
- `docs/TESTES.md`
- `MATERIAIS-TCC.md`

## Qualidade e governanca

- Licenca: `LICENSE` (ISC)
- Changelog: `CHANGELOG.md`
- Contribuicao: `CONTRIBUTING.md`
- Codigo de conduta: `CODE_OF_CONDUCT.md`
- Seguranca: `SECURITY.md`
- CI: `.github/workflows/ci.yml`

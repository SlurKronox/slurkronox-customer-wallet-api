# Kronox Customer Wallet Core API

API Node.js com Express para gerenciamento de usuarios e customers (wallets).

## Objetivo

Este projeto entrega:

- CRUD completo de usuarios em memoria
- CRUD de customers em memoria com carga inicial de JSON de referencia
- Estrutura por camadas para facilitar manutencao (`routes`, `controllers`, `services`, `data`, `validators`)
- Testes automatizados com `node:test`

## Stack tecnica

- Node.js (CommonJS)
- Express
- body-parser
- config
- nodemon
- node:test

## Estrutura do projeto

```text
src/
  aplicacao.js
  servidor.js
  api/
    rotas-api.js
    routes/
      usuarios-rotas.js
      customers.js
      index.js
    controllers/
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
    index.js
    erros/
      erro-http.js
      index.js
    intermediarios/
      nao-encontrado.js
      tratador-erro.js
      index.js
tests/
  usuarios.api.test.js
  customers.api.test.js
postman/
  Kronox-Customer-Wallet-Core.postman_collection.json
  Kronox-Customer-Wallet-Core.postman_environment.json
```

## Como rodar

### 1) Instalar dependencias

```bash
npm install
```

### 2) Subir em desenvolvimento

```bash
npm run dev
```

### 3) Subir normalmente

```bash
npm start
```

### 4) Rodar testes

```bash
npm test
```

## Configuracao

Arquivo de configuracao:

- `src/config/default.json`

Chave:

- `server.port`

Prioridade da porta:

1. `process.env.PORT` (quando valida)
2. `server.port` no config
3. fallback `3000`

Comportamento em `EADDRINUSE`:

- Se `PORT` nao for definida, a API tenta automaticamente a proxima porta livre (ate `3020`).
- Se `PORT` for definida e estiver ocupada, a API encerra com erro claro.

## Endpoints

Prefixo de versao:

- `/api/v1`

### Usuarios

- `GET /api/v1/usuarios`
- `GET /api/v1/usuarios/:id`
- `POST /api/v1/usuarios`
- `PUT /api/v1/usuarios/:id`
- `PATCH /api/v1/usuarios/:id`
- `DELETE /api/v1/usuarios/:id`

Campos de usuario:

- `nome` (string)
- `email` (string valida)
- `papel` (string)
- `ativo` (boolean)

### Customers

- `GET /api/v1/customers`
- `GET /api/v1/customers/:id`
- `POST /api/v1/customers`
- `PUT /api/v1/customers/:id`
- `PATCH /api/v1/customers/:id`
- `DELETE /api/v1/customers/:id`

Origem dos dados:

- carga inicial de `src/api/data/referencias/customer-wallets.json`

## Comportamento de erro

- `400` validacao/entrada invalida
- `404` rota nao encontrada ou recurso nao encontrado
- `409` conflito (ex.: email ja existe)
- `500` erro interno nao tratado

## Limites atuais

- Usuarios sao mantidos em memoria (reiniciar servidor perde dados).
- Customers sao mantidos em memoria apos a carga inicial do JSON (reiniciar servidor restaura o estado inicial).

## Postman

Arquivos prontos para importacao:

- `postman/Kronox-Customer-Wallet-Core.postman_collection.json`
- `postman/Kronox-Customer-Wallet-Core.postman_environment.json`

Passos:

1. Abrir Postman.
2. Importar os dois arquivos.
3. Selecionar o environment `Kronox Customer Wallet Core - Local`.
4. Ajustar `baseUrl` se o servidor subir em porta diferente de `3000`.
`baseUrl` ja vem como `http://localhost:3000/api/v1`.
5. Para fluxo completo de customers, execute na ordem da collection (o `customerIdCriado` e preenchido automaticamente apos o `POST`).

## Documentacao detalhada

- `docs/ARQUITETURA.md`
- `docs/API.md`
- `docs/TESTES.md`
- `docs/OPERACAO.md`
- `MATERIAIS-TCC.md`

# Kronox Customer Wallet Core API

API Node.js com Express para gerenciamento de usuarios e consulta de customers (wallets).

## Objetivo

Este projeto entrega:

- CRUD completo de usuarios em memoria
- Leitura de customers a partir de JSON de referencia
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

## Endpoints

### Usuarios

- `GET /usuarios`
- `GET /usuarios/:id`
- `POST /usuarios`
- `PUT /usuarios/:id`
- `PATCH /usuarios/:id`
- `DELETE /usuarios/:id`

Campos de usuario:

- `nome` (string)
- `email` (string valida)
- `papel` (string)
- `ativo` (boolean)

### Customers

- `GET /customers`
- `GET /customers/:id`

Origem dos dados:

- `src/api/data/referencias/customer-wallets.json`

## Comportamento de erro

- `400` validacao/entrada invalida
- `404` rota nao encontrada ou recurso nao encontrado
- `409` conflito (ex.: email ja existe)
- `500` erro interno nao tratado

## Limites atuais

- Usuarios sao mantidos em memoria (reiniciar servidor perde dados).
- Customers sao somente leitura a partir de JSON local.

## Documentacao detalhada

- `docs/ARQUITETURA.md`
- `docs/API.md`
- `docs/TESTES.md`
- `docs/OPERACAO.md`
- `MATERIAIS-TCC.md`

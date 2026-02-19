# Tutorial Postman (Passo a Passo)

Este guia mostra como testar a API no Postman, do zero, de forma simples.

## 1) Pre-requisitos

- Node.js instalado
- Dependencias instaladas no projeto
- Postman Desktop instalado

No terminal da pasta do projeto:

```bash
npm install
```

## 2) Subir a API

Rode a API antes de testar no Postman:

```bash
npm start
```

Se preferir modo desenvolvimento:

```bash
npm run dev
```

A API sobe em:

- `http://localhost:3000/api/v1`

## 3) Importar arquivos no Postman

No Postman:

1. Clique em `Import`
2. Selecione os arquivos:
- `postman/Kronox-Customer-Wallet-Core.postman_collection.json`
- `postman/Kronox-Customer-Wallet-Core.postman_environment.json`
3. Confirme a importacao

## 4) Selecionar o ambiente

No canto superior direito do Postman:

1. Selecione o environment `Kronox Customer Wallet Core - Local`
2. Confira a variavel `baseUrl`

Valor esperado:

- `http://localhost:3000/api/v1`

Se a API estiver em outra porta, ajuste o `baseUrl`.

## 5) Teste manual (ordem recomendada)

Rode na ordem:

1. `Health > Status da API`
2. `Usuarios > Listar Usuarios`
3. `Usuarios > Criar Usuario`
4. `Usuarios > Obter Usuario por ID`
5. `Usuarios > Atualizar Usuario (PUT)`
6. `Usuarios > Atualizacao Parcial (PATCH)`
7. `Usuarios > Excluir Usuario`
8. `Customers > Listar Customers`
9. `Customers > Obter Customer por ID`
10. `Customers > Criar Customer`
11. `Customers > Obter Customer Criado`
12. `Customers > Atualizar Customer (PUT)`
13. `Customers > Atualizacao Parcial Customer (PATCH)`
14. `Customers > Excluir Customer`

Observacao importante:

- `usuarioIdCriado` e `customerIdCriado` sao preenchidos automaticamente apos os requests de criacao.

## 6) Rodar tudo de uma vez (Collection Runner)

No Postman:

1. Abra a collection
2. Clique em `Run collection`
3. Selecione o environment local
4. Clique em `Run`

Resultado esperado:

- todas as requisicoes em verde
- sem falhas de assertiva

## 7) Status HTTP esperados

- `GET`: `200`
- `POST`: `201`
- `PUT`: `200`
- `PATCH`: `200`
- `DELETE`: `204`

## 8) Erros comuns e como resolver

### Erro de conexao

Mensagem comum:

- `Could not send request`

Como resolver:

- confirme se a API esta rodando
- confira a porta no `baseUrl`

### `404 Not Found`

- confira se a URL tem `/api/v1`
- confira se o endpoint esta correto

### `400 Bad Request`

- payload invalido
- campo obrigatorio faltando
- campo nao permitido

### `409 Conflict`

- email ja existente
- id de customer duplicado

### `429 Too Many Requests`

- limite de requisicoes por IP excedido
- aguarde alguns minutos e tente novamente

## 9) Teste via terminal (sem abrir Postman)

Com a API ligada:

```bash
npm run test:postman
```

Esse comando executa a mesma collection com Newman.

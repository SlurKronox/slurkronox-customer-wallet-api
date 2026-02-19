# Referencia de API

Base URL local:

- `http://localhost:3000/api/v1`

## Padrao de resposta

### Sucesso

```json
{
  "dados": {},
  "meta": {
    "total": 1
  }
}
```

- `meta` aparece em listagens.

### Erro

```json
{
  "mensagem": "Descricao do erro",
  "requestId": "uuid",
  "detalhes": [
    {
      "campo": "email",
      "mensagem": "Email invalido"
    }
  ]
}
```

- `detalhes` e opcional (validacao).

## Health

### GET /api/v1/health

Resposta `200`:

```json
{
  "dados": {
    "status": "ok",
    "servico": "kronox-customer-wallet-core",
    "versao": "1.1.0",
    "ambiente": "development",
    "timestamp": "2026-02-19T18:20:00.000Z"
  }
}
```

## Usuarios

### GET /api/v1/usuarios

Retorna lista de usuarios.

Resposta `200`:

```json
{
  "dados": [],
  "meta": {
    "total": 0
  }
}
```

### GET /api/v1/usuarios/:id

Respostas:

- `200` usuario encontrado
- `400` id invalido
- `404` nao encontrado

### POST /api/v1/usuarios

Body minimo:

```json
{
  "nome": "Ana",
  "email": "ana@empresa.com"
}
```

Regras:

- campos permitidos: `nome`, `email`, `papel`, `ativo`
- `nome` e `email` obrigatorios
- `email` valido e unico

Respostas:

- `201` criado
- `400` validacao
- `409` conflito

### PUT /api/v1/usuarios/:id

Atualizacao completa.

Obrigatorios: `nome`, `email`.

Respostas:

- `200` atualizado
- `400` validacao/id
- `404` nao encontrado
- `409` conflito

### PATCH /api/v1/usuarios/:id

Atualizacao parcial.

Respostas:

- `200` atualizado
- `400` validacao/id
- `404` nao encontrado
- `409` conflito

### DELETE /api/v1/usuarios/:id

Respostas:

- `204` removido
- `400` id invalido
- `404` nao encontrado

## Customers

### GET /api/v1/customers

Retorna lista de customers.

Resposta `200`:

```json
{
  "dados": [],
  "meta": {
    "total": 0
  }
}
```

### GET /api/v1/customers/:id

Respostas:

- `200` encontrado
- `400` id invalido
- `404` nao encontrado

### POST /api/v1/customers

Body minimo:

```json
{
  "name": "Cliente A",
  "email": "cliente.a@empresa.com"
}
```

Campos permitidos:

- `id`, `name`, `email`, `parentId`, `birthDate`, `cellphone`, `phone`, `occupation`, `state`

Regras:

- `name` e `email` obrigatorios
- `email` valido e unico
- `id` unico, quando informado
- `state` deve ter 2 letras

Respostas:

- `201` criado
- `400` validacao
- `409` conflito

### PUT /api/v1/customers/:id

Atualizacao completa.

Obrigatorios: `name`, `email`.

Respostas:

- `200` atualizado
- `400` validacao/id
- `404` nao encontrado
- `409` conflito

### PATCH /api/v1/customers/:id

Atualizacao parcial.

Respostas:

- `200` atualizado
- `400` validacao/id
- `404` nao encontrado
- `409` conflito

### DELETE /api/v1/customers/:id

Respostas:

- `204` removido
- `400` id invalido
- `404` nao encontrado

## Rate limit

Todos os endpoints podem retornar `429` quando o limite por IP for excedido.

## Especificacao formal

Consulte `docs/openapi.yaml`.

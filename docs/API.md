# Referencia de API

Base URL local:

- `http://localhost:3000/api/v1`

## Health basica

Sem endpoint dedicado de healthcheck no momento.
Use `GET /api/v1/usuarios` para validar disponibilidade funcional.

## Usuarios

### GET /api/v1/usuarios

Lista usuarios cadastrados.

Resposta `200`:

```json
[
  {
    "id": 1,
    "nome": "Ana",
    "email": "ana@empresa.com",
    "papel": "usuario",
    "ativo": true,
    "criadoEm": "2026-02-12T10:00:00.000Z",
    "atualizadoEm": "2026-02-12T10:00:00.000Z"
  }
]
```

### GET /api/v1/usuarios/:id

Busca usuario por id inteiro positivo.

Resposta `200` em sucesso.
Resposta `400` para id invalido.
Resposta `404` quando nao encontrado.

### POST /api/v1/usuarios

Cria usuario.

Body:

```json
{
  "nome": "Ana",
  "email": "ana@empresa.com",
  "papel": "usuario",
  "ativo": true
}
```

Regras:

- `nome` obrigatorio
- `email` obrigatorio e valido
- `papel` opcional (padrao `usuario`)
- `ativo` opcional (padrao `true`)
- `email` unico

Resposta `201` em sucesso.
Resposta `400` em validacao.
Resposta `409` para email duplicado.

### PUT /api/v1/usuarios/:id

Atualizacao completa.

Body exige:

- `nome`
- `email`

Demais campos opcionais: `papel`, `ativo`.

Resposta `200`, `400`, `404`, `409`.

### PATCH /api/v1/usuarios/:id

Atualizacao parcial.

Body deve ter pelo menos um campo entre:

- `nome`
- `email`
- `papel`
- `ativo`

Resposta `200`, `400`, `404`, `409`.

### DELETE /api/v1/usuarios/:id

Remove usuario.

Resposta `204` em sucesso.
Resposta `400` para id invalido.
Resposta `404` quando nao encontrado.

## Customers

### GET /api/v1/customers

Retorna payload completo de wallets carregado em memoria.

Resposta `200`:

```json
{
  "customerWallets": {
    "data": []
  }
}
```

### GET /api/v1/customers/:id

Busca customer por id textual.

Resposta `200` em sucesso.
Resposta `400` para id invalido.
Resposta `404` quando nao encontrado.

### POST /api/v1/customers

Cria customer.

Body minimo:

```json
{
  "name": "Cliente A",
  "email": "cliente.a@empresa.com"
}
```

Campos opcionais:

- `id`
- `parentId`
- `birthDate`
- `cellphone`
- `phone`
- `occupation`
- `state` (2 letras)

Resposta `201` em sucesso.
Resposta `400` em validacao.
Resposta `409` para `id` duplicado.

### PUT /api/v1/customers/:id

Atualizacao completa.

Body exige:

- `name`
- `email`

Demais campos opcionais.

Resposta `200`, `400`, `404`.

### PATCH /api/v1/customers/:id

Atualizacao parcial.

Body deve ter pelo menos um campo valido de customer.

Resposta `200`, `400`, `404`.

### DELETE /api/v1/customers/:id

Remove customer.

Resposta `204` em sucesso.
Resposta `400` para id invalido.
Resposta `404` quando nao encontrado.

## Formato de erro

Resposta de erro padrao:

```json
{
  "mensagem": "Mensagem do erro",
  "detalhes": []
}
```

Exemplo de validacao (`400`):

```json
{
  "mensagem": "Erro de validacao",
  "detalhes": [
    {
      "campo": "email",
      "mensagem": "Email invalido"
    }
  ]
}
```

## Exemplos cURL

Criar usuario:

```bash
curl -X POST http://localhost:3000/api/v1/usuarios \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Ana\",\"email\":\"ana@empresa.com\"}"
```

Listar customers:

```bash
curl http://localhost:3000/api/v1/customers
```

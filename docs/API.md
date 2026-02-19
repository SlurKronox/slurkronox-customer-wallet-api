# Referencia da API

Base URL local:

- `http://localhost:3000/api/v1`

Formato de resposta de erro:

```json
{
  "mensagem": "Descricao do erro",
  "detalhes": [
    {
      "campo": "email",
      "mensagem": "Email invalido"
    }
  ]
}
```

`detalhes` e opcional e aparece em erros de validacao.

## Health

### GET /api/v1/health

Retorna status basico da API.

Resposta `200`:

```json
{
  "status": "ok",
  "servico": "kronox-customer-wallet-core",
  "versao": "1.0.0",
  "ambiente": "development",
  "timestamp": "2026-02-19T18:20:00.000Z"
}
```

## Usuarios

### GET /api/v1/usuarios

Lista usuarios cadastrados.

Resposta `200`: array de usuarios.

### GET /api/v1/usuarios/:id

Busca usuario por id numerico inteiro positivo.

Respostas:

- `200`: usuario encontrado
- `400`: id invalido
- `404`: usuario nao encontrado

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

Respostas:

- `201`: criado
- `400`: erro de validacao
- `409`: email ja existe

### PUT /api/v1/usuarios/:id

Atualizacao completa de usuario.

Campos obrigatorios no body:

- `nome`
- `email`

Respostas:

- `200`: atualizado
- `400`: erro de validacao/id
- `404`: usuario nao encontrado
- `409`: email ja existe

### PATCH /api/v1/usuarios/:id

Atualizacao parcial de usuario.

Informe ao menos um campo:

- `nome`
- `email`
- `papel`
- `ativo`

Respostas:

- `200`: atualizado
- `400`: erro de validacao/id
- `404`: usuario nao encontrado
- `409`: email ja existe

### DELETE /api/v1/usuarios/:id

Remove usuario.

Respostas:

- `204`: removido
- `400`: id invalido
- `404`: usuario nao encontrado

## Customers

### GET /api/v1/customers

Lista customers no formato:

```json
{
  "customerWallets": {
    "data": []
  }
}
```

Resposta `200`.

### GET /api/v1/customers/:id

Busca customer por id textual.

Respostas:

- `200`: customer encontrado
- `400`: id invalido
- `404`: customer nao encontrado

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

Respostas:

- `201`: criado
- `400`: erro de validacao
- `409`: id de customer ja existe

### PUT /api/v1/customers/:id

Atualizacao completa de customer.

Campos obrigatorios no body:

- `name`
- `email`

Respostas:

- `200`: atualizado
- `400`: erro de validacao/id
- `404`: customer nao encontrado

### PATCH /api/v1/customers/:id

Atualizacao parcial de customer.

Informe ao menos um campo valido.

Respostas:

- `200`: atualizado
- `400`: erro de validacao/id
- `404`: customer nao encontrado

### DELETE /api/v1/customers/:id

Remove customer.

Respostas:

- `204`: removido
- `400`: id invalido
- `404`: customer nao encontrado

## Exemplos cURL

Criar usuario:

```bash
curl -X POST http://localhost:3000/api/v1/usuarios \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Ana\",\"email\":\"ana@empresa.com\"}"
```

Healthcheck:

```bash
curl http://localhost:3000/api/v1/health
```

Listar customers:

```bash
curl http://localhost:3000/api/v1/customers
```

# Referencia de API

Base URL local:

- `http://localhost:3000`

## Health basica

Sem endpoint dedicado de healthcheck no momento.
Use `GET /usuarios` para validar disponibilidade funcional.

## Usuarios

### GET /usuarios

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

### GET /usuarios/:id

Busca usuario por id inteiro positivo.

Resposta `200` em sucesso.
Resposta `400` para id invalido.
Resposta `404` quando nao encontrado.

### POST /usuarios

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

### PUT /usuarios/:id

Atualizacao completa.

Body exige:

- `nome`
- `email`

Demais campos opcionais: `papel`, `ativo`.

Resposta `200`, `400`, `404`, `409`.

### PATCH /usuarios/:id

Atualizacao parcial.

Body deve ter pelo menos um campo entre:

- `nome`
- `email`
- `papel`
- `ativo`

Resposta `200`, `400`, `404`, `409`.

### DELETE /usuarios/:id

Remove usuario.

Resposta `204` em sucesso.
Resposta `400` para id invalido.
Resposta `404` quando nao encontrado.

## Customers

### GET /customers

Retorna payload completo de wallets de referencia.

Resposta `200`:

```json
{
  "customerWallets": {
    "data": []
  }
}
```

### GET /customers/:id

Busca customer por id textual no JSON de referencia.

Resposta `200` em sucesso.
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
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Ana\",\"email\":\"ana@empresa.com\"}"
```

Listar customers:

```bash
curl http://localhost:3000/customers
```

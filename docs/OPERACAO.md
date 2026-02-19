# Operacao e Manutencao

## Requisitos

- Node.js 20+ (usar `.nvmrc`)
- npm 10+

## Scripts

- `npm run dev`: desenvolvimento com `node --watch`
- `npm start`: executa API
- `npm test`: suite automatizada
- `npm run test:postman`: executa collection Postman (API deve estar em execucao)

## Configuracao

Arquivo: `src/config/default.json`

```json
{
  "server": {
    "port": 3000
  },
  "security": {
    "rateLimit": {
      "windowMs": 900000,
      "max": 500
    }
  }
}
```

Override de porta (PowerShell):

```powershell
$env:PORT = "4000"
npm start
```

## Comportamento de inicializacao

- Se a porta configurada estiver em uso e `PORT` nao for fixa, a API tenta a proxima porta (maximo 20 tentativas).
- Se `PORT` for fixa e estiver em uso, o processo encerra com erro.

## Observabilidade basica

- Logs com timestamp e nivel.
- `requestId` em todas as respostas e erros.
- Healthcheck em `GET /api/v1/health`.

## Seguranca basica

- `helmet` habilitado.
- `express-rate-limit` habilitado.
- Resposta `500` sem exposicao de stack para o cliente.

## Troubleshooting

### `404` inesperado

1. confirme prefixo `/api/v1`
2. confirme metodo HTTP correto
3. valide URL no Postman/collection

### `400` de validacao

1. verifique campos obrigatorios
2. remova campos nao permitidos
3. confirme formato dos dados (`email`, `state`, etc.)

### `429` limite excedido

1. aguarde a janela de rate limit
2. reduza frequencia de chamadas por IP

### Encerramento da API

Em `SIGINT`/`SIGTERM`, a API fecha conexoes de forma graciosa.

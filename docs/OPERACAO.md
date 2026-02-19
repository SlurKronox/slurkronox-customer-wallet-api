# Operacao e Manutencao

## Requisitos

- Node.js 20+ (recomendado usar `.nvmrc`)
- npm 10+

## Scripts

- `npm run dev`: sobe com `nodemon`.
- `npm start`: sobe servidor normal.
- `npm test`: executa suite automatizada.
- `npm run test:postman`: executa collection Postman (requer API em execucao).

## Configuracao de porta

Arquivo:

- `src/config/default.json`

Exemplo:

```json
{
  "server": {
    "port": 3000
  }
}
```

Override por variavel de ambiente:

```powershell
$env:PORT = "4000"
npm start
```

## Healthcheck

Use:

- `GET /api/v1/health`

Objetivo:

- validar disponibilidade da API e metadados de runtime.

## Persistencia

- Usuarios: memoria local (nao persistente).
- Customers: memoria local carregada de `customer-wallets.json`.

Ao reiniciar o servidor, os dados voltam ao estado inicial.

## Logs

Atualmente:

- log de startup (`Servidor rodando na porta X`).
- erros de inicializacao de porta.

Nao ha logging estruturado nesta versao.

## Troubleshooting

### Porta em uso (`EADDRINUSE`)

1. Se `PORT` estiver fixa, troque para outra porta livre.
2. Sem `PORT` fixa, o servidor tenta automaticamente a proxima porta.
3. Se o range `3000-3020` estiver ocupado, o processo encerra.

### Erro 404 em rota valida

Checklist:

1. Confirme se o prefixo `/api/v1` foi usado.
2. Confirme metodo HTTP correto.
3. Confirme que o servidor iniciou sem erro.

### Erro 400 de validacao

Checklist:

1. Verifique campos obrigatorios.
2. Verifique tipos (`boolean`, `string`, `email`, etc.).
3. Consulte `docs/API.md` ou `docs/openapi.yaml`.

## Operacao com Postman

1. Importe a collection e o environment da pasta `postman/`.
2. Ajuste `baseUrl` para a porta atual.
3. Execute a collection completa para smoke test.

## Evolucao recomendada

1. Adicionar persistencia real (PostgreSQL/MongoDB).
2. Adicionar autenticacao e autorizacao.
3. Adicionar logging estruturado e observabilidade.
4. Adicionar testes de integracao com cenarios de erro mais amplos.

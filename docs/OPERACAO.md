# Operacao e Manutencao

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Scripts disponiveis

- `npm run dev`: sobe com `nodemon`
- `npm start`: sobe servidor normal
- `npm test`: executa testes

## Configuracao de porta

Configurada em `src/config/default.json`:

```json
{
  "server": {
    "port": 3000
  }
}
```

Tambem e possivel usar variavel de ambiente:

```bash
PORT=4000 npm start
```

No PowerShell:

```powershell
$env:PORT = "4000"
npm start
```

## Logs

Log atual no startup:

- `Servidor rodando na porta X`

Nao existe logging estruturado ainda.

## Persistencia

- Usuarios: memoria local (nao persistente)
- Customers: arquivo local de referencia

## Problemas comuns

### Porta em uso

Sintoma: erro `EADDRINUSE`.

Acao:

1. Mudar `PORT`.
2. Encerrar processo que esta usando a porta.

### Rota retorna 404

Verificar:

1. Se servidor subiu corretamente.
2. Se URL esta correta (`/usuarios` ou `/customers`).
3. Se metodo HTTP esta correto.

### Falha em testes

Executar:

```bash
npm test
```

Se falhar, revisar:

1. Mudancas recentes em rotas/controllers/services.
2. Payload esperado nos testes.

## Roadmap tecnico sugerido

1. Persistencia real (PostgreSQL/MongoDB).
2. Camada de autenticacao e autorizacao.
3. Logging estruturado e observabilidade.
4. Versionamento de API (`/v1`).

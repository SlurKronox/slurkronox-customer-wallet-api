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
- Customers: memoria local (carregada inicialmente de `src/api/data/referencias/customer-wallets.json`)

## Problemas comuns

### Porta em uso

Sintoma: erro `EADDRINUSE`.

Acao:

1. Se `PORT` estiver definida, altere para outra porta livre.
2. Se `PORT` nao estiver definida, a aplicacao tenta automaticamente a proxima porta livre (de `3000` ate `3020`).
3. Se todas estiverem ocupadas, encerra com erro.

### Rota retorna 404

Verificar:

1. Se servidor subiu corretamente.
2. Se URL esta correta (`/api/v1/usuarios` ou `/api/v1/customers`).
3. Se metodo HTTP esta correto.

### Falha em testes

Executar:

```bash
npm test
```

Se falhar, revisar:

1. Mudancas recentes em rotas/controllers/services.
2. Payload esperado nos testes.

### Testar no Postman

1. Importe `postman/Kronox-Customer-Wallet-Core.postman_collection.json`.
2. Importe `postman/Kronox-Customer-Wallet-Core.postman_environment.json`.
3. Escolha o environment local.
4. Ajuste `baseUrl` para a porta exibida no log de startup.
Valor sugerido: `http://localhost:PORTA/api/v1`.

## Roadmap tecnico sugerido

1. Persistencia real (PostgreSQL/MongoDB).
2. Camada de autenticacao e autorizacao.
3. Logging estruturado e observabilidade.
4. Versionamento de API (`/v1`).

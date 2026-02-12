# Arquitetura da API

## Visao geral

A API segue separacao por responsabilidade:

- `routes`: define endpoints HTTP e delega ao controller
- `controllers`: converte entrada HTTP para chamadas de servico
- `services`: aplica regras de negocio
- `data`: acesso aos dados (em memoria ou referencia JSON)
- `validators`: regras de validacao de payload
- `compartilhado`: erros e middlewares globais

## Fluxo de requisicao

1. Requisicao chega em `src/servidor.js`
2. `src/aplicacao.js` registra rotas via `src/api/rotas-api.js`
3. Rota chama controller correspondente
4. Controller chama servico
5. Servico chama repositorio/data e valida regras de negocio
6. Resposta retorna ao cliente
7. Em erro, `tratador-erro` monta resposta padrao

## Modulos existentes

### Usuarios

- Entrada HTTP: `src/api/routes/usuarios-rotas.js`
- Controller: `src/api/controllers/usuarios-controlador.js`
- Service: `src/api/services/usuarios-servico.js`
- Data: `src/api/data/usuarios-repositorio.js`
- Validator: `src/api/validators/usuarios-validador.js`

### Customers

- Entrada HTTP: `src/api/routes/customers.js`
- Controller: `src/api/controllers/customers.js`
- Service: `src/api/services/customers-servico.js`
- Data: `src/api/data/customers-repositorio.js`
- Referencia: `src/api/data/referencias/customer-wallets.json`

## Tratamento de erros

- Classe base: `src/compartilhado/erros/erro-http.js`
- Middleware 404: `src/compartilhado/intermediarios/nao-encontrado.js`
- Middleware global: `src/compartilhado/intermediarios/tratador-erro.js`

Padrao de payload de erro:

```json
{
  "mensagem": "Descricao do erro",
  "detalhes": []
}
```

`detalhes` aparece quando existe validacao ou erro com detalhes anexados.

## Configuracao e bootstrap

- Porta resolvida em `src/config/servidor.config.js`
- App Express criada em `src/config/express.js`
- Entrada de configuracao em `src/config/default.json`

## Decisoes arquiteturais

- Dados de usuarios em memoria para simplicidade da fase atual.
- Customers em leitura de arquivo para referencia estatica.
- Camadas separadas para facilitar migracao futura para banco real.

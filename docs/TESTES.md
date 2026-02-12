# Testes

## Ferramenta

- Runner nativo: `node:test`
- Assertivas: `node:assert/strict`

## Como executar

```bash
npm test
```

## Arquivos de teste

- `tests/usuarios.api.test.js`
- `tests/customers.api.test.js`

## Cenarios cobertos

### Usuarios

- Listagem inicial de usuarios (`GET /usuarios`)
- Criacao de usuario (`POST /usuarios`)
- Busca por id (`GET /usuarios/:id`)
- Exclusao (`DELETE /usuarios/:id`)

### Customers

- Listagem de customers (`GET /customers`)
- Busca de customer por id existente (`GET /customers/:id`)
- Busca de customer por id inexistente (`404`)

## O que ainda nao esta coberto

- Casos de validacao detalhada para todos os campos de usuarios
- Conflito de email duplicado (`409`) em teste dedicado
- Casos de `PUT` e `PATCH` com payloads invalidos
- Comportamento de middlewares em erros internos (`500`)

## Recomendacao para evolucao

1. Adicionar testes de regressao para todos os status de erro esperados.
2. Isolar dados por teste com setup/teardown mais explicitos quando houver banco real.
3. Medir cobertura com ferramenta dedicada quando projeto crescer.

# Guia de Contribuicao

Obrigado por contribuir com a `Kronox Customer Wallet Core API`.

## Requisitos locais

- Node.js 20+
- npm 10+

## Fluxo recomendado

1. Faça um fork ou crie branch a partir da `main`.
2. Mantenha cada PR focado em um objetivo.
3. Execute os testes antes de abrir PR.
4. Atualize a documentacao quando alterar comportamento da API.

## Padrao de branch

Use nomes descritivos:

- `feat/nome-da-feature`
- `fix/nome-do-bug`
- `docs/ajuste-documentacao`

## Padrao de commit

Preferencialmente use Conventional Commits:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `test: ...`
- `chore: ...`

## Checklist de Pull Request

- [ ] Build e testes locais executados com sucesso.
- [ ] Mudancas cobertas por testes ou justificadas.
- [ ] Documentacao atualizada (`README.md` e/ou `docs/`).
- [ ] Sem arquivos duplicados ou codigo morto.
- [ ] Sem segredos no codigo.

## Como testar localmente

```bash
npm install
npm test
```

Para teste manual da API:

```bash
npm start
```

E utilize a collection em `postman/`.

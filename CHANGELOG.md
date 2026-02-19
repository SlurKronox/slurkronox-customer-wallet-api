# Changelog

Todas as mudancas relevantes deste projeto serao documentadas neste arquivo.

O formato segue o principio de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [1.1.0] - 2026-02-19

### Added

- Middleware de seguranca com `helmet`.
- Limitacao de requisicoes por IP com `express-rate-limit`.
- `x-request-id` em todas as respostas para rastreabilidade.
- Logger basico com niveis (`INFO`, `WARN`, `ERROR`).
- Script `test:postman` e melhorias de automacao nos testes.
- Validacoes para campos desconhecidos em usuarios e customers.
- Regras de unicidade de email para customers.

### Changed

- Contrato de resposta padronizado para sucesso: `{ dados, meta? }`.
- Contrato de erro padronizado com `requestId`.
- Fluxo de desenvolvimento alterado para `node --watch` (sem `nodemon`).
- Suite de testes ampliada com cenarios de validacao e conflitos.
- Documentacao atualizada (README, docs e OpenAPI).

### Fixed

- Exposicao de mensagens internas em erros `500` para clientes.
- Dependencias vulneraveis removidas/atualizadas (`npm audit` sem vulnerabilidades).
- Finalizacao graciosa do servidor em sinais de encerramento (`SIGINT`, `SIGTERM`).

## [1.0.0] - 2026-02-19

### Added

- CRUD completo de usuarios em memoria.
- CRUD completo de customers com carga inicial a partir de arquivo JSON.
- Validadores dedicados para usuarios e customers.
- Collection e environment do Postman para validacao de rotas.
- Endpoint de healthcheck em `GET /api/v1/health`.
- Documentacao tecnica em `docs/`.

### Changed

- Prefixo de versao da API para `/api/v1`.
- Boot do servidor com fallback de porta quando ocorre `EADDRINUSE` sem `PORT` fixa.

### Fixed

- Dados de referencia de customers com typos e id duplicado.

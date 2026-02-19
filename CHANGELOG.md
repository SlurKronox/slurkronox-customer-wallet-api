# Changelog

Todas as mudancas relevantes deste projeto serao documentadas neste arquivo.

O formato segue o principio de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

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

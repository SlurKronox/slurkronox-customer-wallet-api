# Politica de Seguranca

## Versoes suportadas

Atualmente, apenas a branch `main` recebe correcoes de seguranca.

## Como reportar vulnerabilidades

Se voce identificar uma vulnerabilidade:

1. Nao abra issue publica com detalhes sensiveis.
2. Envie um reporte privado ao mantenedor do repositorio no GitHub.
3. Inclua passos para reproducao, impacto e sugestao de mitigacao.

## O que esperar

- Confirmacao de recebimento em ate 72 horas.
- Analise tecnica inicial.
- Correcao e comunicacao da versao com patch, quando aplicavel.

## Boas praticas deste projeto

- Nao armazenar segredos no codigo.
- Validar entradas em camada de servico/validator.
- Retornar erros HTTP padronizados sem vazar stack trace.

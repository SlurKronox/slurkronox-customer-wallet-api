const { porta, rateLimitConfig } = require('./servidor.config');
const criarAplicacaoExpress = require('./express');

module.exports = { porta, rateLimitConfig, criarAplicacaoExpress };

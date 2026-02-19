const path = require('path');

process.env.NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR || path.join(__dirname);

const config = require('config');

function obterPorta() {
  const portaEnv = Number(process.env.PORT);
  if (Number.isInteger(portaEnv) && portaEnv > 0) {
    return portaEnv;
  }

  if (config.has('server.port')) {
    const portaConfig = Number(config.get('server.port'));
    if (Number.isInteger(portaConfig) && portaConfig > 0) {
      return portaConfig;
    }
  }

  return 3000;
}

function obterRateLimitConfig() {
  const padrao = {
    windowMs: 15 * 60 * 1000,
    max: 500,
  };

  if (!config.has('security.rateLimit')) {
    return padrao;
  }

  const origem = config.get('security.rateLimit');
  const windowMs = Number(origem.windowMs);
  const max = Number(origem.max);

  return {
    windowMs: Number.isInteger(windowMs) && windowMs > 0 ? windowMs : padrao.windowMs,
    max: Number.isInteger(max) && max > 0 ? max : padrao.max,
  };
}

const porta = obterPorta();
const rateLimitConfig = obterRateLimitConfig();

module.exports = { porta, rateLimitConfig };

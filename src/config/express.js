const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { porta, rateLimitConfig } = require('./servidor.config');
const { requestId } = require('../compartilhado');

module.exports = () => {
  const app = express();

  app.disable('x-powered-by');
  app.set('port', porta);
  app.use(requestId);
  app.use(helmet());
  app.use(rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.max,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  }));

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));

  return app;
};

const express = require('express');
const bodyParser = require('body-parser');
const { porta } = require('./servidor.config');

module.exports = () => {
  const app = express();

  app.set('port', porta);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  return app;
};
  
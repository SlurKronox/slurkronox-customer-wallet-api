const express = require('express');
const { healthControlador } = require('../controllers');

const rotas = express.Router();

rotas.get('/', healthControlador.obterSaude);

module.exports = rotas;

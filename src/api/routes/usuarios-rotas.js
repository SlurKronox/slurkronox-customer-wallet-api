const express = require('express');
const { usuariosControlador } = require('../controllers');

const rotas = express.Router();

rotas.get('/', usuariosControlador.listarUsuarios);
rotas.get('/:id', usuariosControlador.obterUsuario);
rotas.post('/', usuariosControlador.criarUsuario);
rotas.put('/:id', usuariosControlador.atualizarUsuario);
rotas.patch('/:id', usuariosControlador.atualizarParcialUsuario);
rotas.delete('/:id', usuariosControlador.excluirUsuario);

module.exports = rotas;

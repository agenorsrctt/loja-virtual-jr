const usuariosController = require('../controllers/usuarios.controllers');
const express = require('express');
const router = express.Router();

router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.buscarUsuarioPorId);
router.post('/', usuariosController.criarUsuario);
router.put('/:id', usuariosController.atualizarUsuario);
router.delete('/:id', usuariosController.deletarUsuario);

module.exports = router;
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controllers');

router.get('/', clientesController.listarClientes);
router.get('/:id', clientesController.buscarClientePorId);
router.post('/', clientesController.criarCliente);
router.put('/:id', clientesController.atualizarCliente);
router.delete('/:id', clientesController.deletarCliente);

module.exports = router;
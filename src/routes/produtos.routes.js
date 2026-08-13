const produtosController = require('../controllers/produtos.controllers');
const express = require('express');
const router = express.Router();

router.get('/', produtosController.listarProdutos);
router.get('/:id', produtosController.buscarProdutoPorId);
router.post('/', produtosController.criarProduto);
router.put('/:id', produtosController.atualizarProduto);
router.delete('/:id', produtosController.deletarProduto);

module.exports = router;
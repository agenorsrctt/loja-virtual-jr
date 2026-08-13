const produtosService = require('../services/produtos.services');

async function listarProdutos(req, res) {
    try {
        const produtos = await produtosService.listarProdutos();
        res.json(produtos);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function buscarProdutoPorId(req, res) {
    const { id } = req.params;
    try {
        const produto = await produtosService.buscarProdutoPorId(id);
        res.json(produto);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function criarProduto(req, res) {
    const produto = req.body;
    try {
        const novoProduto = await produtosService.criarProduto(produto);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function atualizarProduto(req, res) {
    const { id } = req.params;
    const produto = req.body;
    try {
        const produtoAtualizado = await produtosService.atualizarProduto(id, produto);
        res.json(produtoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarProduto(req, res) {
    const { id } = req.params;
    try {
        const produtoDeletado = await produtosService.deletarProduto(id);
        res.json(produtoDeletado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function atualizarEstoqueProduto(req, res) {
    const { id } = req.params;
    const { novoEstoque } = req.body;
    try {
        const produtoAtualizado = await produtosService.atualizarEstoqueProduto(id, novoEstoque);
        res.json(produtoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto,
    atualizarEstoqueProduto
};

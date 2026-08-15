const produtosService = require('../services/produtos.services');

async function listarProdutos(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;
        const produtos = await produtosService.listarProdutos(empresa_id);
        res.json(produtos);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function buscarProdutoPorId(req, res) {
    const { id } = req.params;
    const empresa_id = req.usuario.empresa_id;
    try {
        const produto = await produtosService.buscarProdutoPorId(id, empresa_id);
        res.json(produto);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function criarProduto(req, res) {
    const produto = req.body;
    const empresa_id = req.usuario.empresa_id;
    try {
        const novoProduto = await produtosService.criarProduto(produto, empresa_id);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function atualizarProduto(req, res) {
    const { id } = req.params;
    const produto = req.body;
    const empresa_id = req.usuario.empresa_id;
    try {
        const produtoAtualizado = await produtosService.atualizarProduto(id, produto, empresa_id);
        res.json(produtoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarProduto(req, res) {
    const { id } = req.params;
    const empresa_id = req.usuario.empresa_id;
    try {
        const produtoDeletado = await produtosService.deletarProduto(id, empresa_id);
        res.json(produtoDeletado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function atualizarEstoqueProduto(req, res) {
    const { id } = req.params;
    const { novoEstoque } = req.body;
    const empresa_id = req.usuario.empresa_id;
    try {
        const produtoAtualizado = await produtosService.atualizarEstoqueProduto(id, novoEstoque, empresa_id);
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

const vendasService = require('../services/vendas.services');

async function listarVendas(req, res) {
    try {
        const vendas = await vendasService.listarVendas();
        res.json(vendas);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function buscarVendaPorId(req, res) {
    const { id } = req.params;
    try {
        const venda = await vendasService.buscarVendaPorId(id);
        res.json(venda);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function criarVenda(req, res) {
    const venda = req.body;
    try {
        const novaVenda = await vendasService.criarVenda(venda);
        res.status(201).json(novaVenda);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

module.exports = {
    listarVendas,
    buscarVendaPorId,
    criarVenda
};
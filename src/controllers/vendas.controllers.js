const vendasService = require('../services/vendas.services');

async function listarVendas(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;
        const vendas = await vendasService.listarVendas(empresa_id);
        res.json(vendas);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function buscarVendaPorId(req, res) {
    const { id } = req.params;
    const empresa_id = req.usuario.empresa_id;
    try {
        const venda = await vendasService.buscarVendaPorId(id, empresa_id);
        res.json(venda);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function criarVenda(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;
        const venda = req.body;
        const novaVenda = await vendasService.criarVenda(venda, empresa_id);
        res.status(201).json(novaVenda);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function atualizarStatus(req, res) {
    try {
        const id = req.params.id;
        const empresa_id = req.usuario.empresa_id;
        const { status } = req.body;
        const novoStatus = await vendasService.atualizarStatus(id, status, empresa_id);
        res.status(200).json(novoStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarVendas,
    buscarVendaPorId,
    criarVenda,
    atualizarStatus
};
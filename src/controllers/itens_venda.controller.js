const itensPedidosService = require('../services/itens_venda.services');

async function criarItemPedido(req, res) {
    const itemPedido = req.body;
    try {
        const novoItemPedido = await itensPedidosService.criarItemPedido(itemPedido);
        res.status(201).json(novoItemPedido);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

module.exports = {
    criarItemPedido
};
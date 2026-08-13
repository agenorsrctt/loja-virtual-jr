const itensPedidosRepository = require('../repositories/itens_venda.repositories');
const transaction = require("../database/transaction");

async function criarItemPedido(itemPedido) {
    try {
        await transaction.beginTransaction();
        const novoItemPedido = await itensPedidosRepository.criarItemPedido(itemPedido);
        if (!novoItemPedido) {
            throw new Error('Erro ao criar item do pedido');
        }
        await transaction.commitTransaction();
        return novoItemPedido;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao criar pedido: " + error.message);
    }
}

module.exports = {
    criarItemPedido
};
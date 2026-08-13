const db = require('../database/connection');

async function criarItemPedido(itemPedido) {
    return new Promise((resolve, reject) => {
        const { venda_id, produto_id, quantidade, preco_unitario } = itemPedido;
        db.run('INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)', [venda_id, produto_id, quantidade, preco_unitario], function (erro) {
            if (erro) {
                reject(erro);
            } else {
                resolve({ id: this.lastID, ...itemPedido });
            }
        });
    });
}

module.exports = {
    criarItemPedido
};
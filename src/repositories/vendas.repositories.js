const db = require('../database/connection');

async function listarVendas() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM vendas', (erro, rows) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(rows);
            }
        });
    });
}

async function buscarVendaPorId(id) {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT 
            v.id, v.data_venda, v.total,
            p.produto,
            c.nome AS cliente,
            u.nome AS vendedor,
            i.quantidade, i.preco_unitario

            FROM vendas v
            INNER JOIN usuarios u
            ON v.usuario_id = u.id
            INNER JOIN clientes c
            ON v.cliente_id = c.id
            INNER JOIN itens_venda i
            ON i.venda_id = v.id
            INNER JOIN produtos p
            ON i.produto_id = p.id
            WHERE v.id = ?
            `
            , [id], (erro, row) => {
                if (erro) {
                    return reject(erro);
                } else {
                    resolve(row);
                }
            });
    });
}

async function criarVenda(venda) {
    return new Promise((resolve, reject) => {
        const { cliente_id, usuario_id, total, status } = venda;
        db.run('INSERT INTO vendas (cliente_id, usuario_id, total, status) VALUES (?, ?, ?, ?)', [cliente_id, usuario_id, total, status], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id: this.lastID, ...venda });
            }
        });
    });
}

async function atualizarTotalVenda(id, total) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE vendas SET total = ? WHERE id = ?', [total, id], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id, total });
            }
        });
    });
}

async function atualizarStatus(id, status) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE vendas SET status = ? where id = ?', [status, id], function (erro) {
            if (erro) {
                return reject(erro)
            } else {
                resolve({ id, status })
            }
        })
    })
}

module.exports = {
    listarVendas,
    buscarVendaPorId,
    criarVenda,
    atualizarTotalVenda,
    atualizarStatus,
};
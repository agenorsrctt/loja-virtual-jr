const db = require('../database/connection');

async function listarVendas(empresa_id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM vendas WHERE empresa_id = ?',[empresa_id], (erro, rows) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(rows);
            }
        });
    });
}

async function buscarVendaPorId(id, empresa_id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM vendas WHERE id = ? AND empresa_id = ?`, [id, empresa_id], (erro, row) => {
            if(erro) return reject(erro);

            resolve(row);
        })
    })
}

async function buscarItensVendaPorId(id, empresa_id) {
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
            WHERE v.id = ? AND v.empresa_id = ?
            `
            , [id, empresa_id], (erro, row) => {
                if (erro) {
                    return reject(erro);
                } else {
                    resolve(row);
                }
            });
    });
}

async function criarVenda(venda, empresa_id) {
    return new Promise((resolve, reject) => {
        const { cliente_id, usuario_id, total, status } = venda;
        db.run('INSERT INTO vendas (cliente_id, usuario_id, total, status, empresa_id) VALUES (?, ?, ?, ?, ?)', [cliente_id, usuario_id, total, status, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id: this.lastID, ...venda });
            }
        });
    });
}

async function atualizarTotalVenda(id, total, empresa_id) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE vendas SET total = ? WHERE id = ? AND empresa_id = ?', [total, id, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id, total });
            }
        });
    });
}

async function atualizarStatus(id, status, empresa_id) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE vendas SET status = ? where id = ? AND empresa_id = ?', [status, id, empresa_id], function (erro) {
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
    buscarItensVendaPorId
};
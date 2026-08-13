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
        db.get('SELECT * FROM vendas WHERE id = ?', [id], (erro, row) => {
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
    atualizarStatus
};
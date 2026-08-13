const db = require('../database/connection');

async function listarProdutos() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM produtos', (erro, rows) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(rows);
            }
        });
    });
}

async function buscarProdutoPorId(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM produtos WHERE id = ?', [id], (erro, row) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(row);
            }
        });
    });
}

async function criarProduto(produto) {
    return new Promise((resolve, reject) => {
        const { produto: nomeProduto, preco, estoque } = produto;
        db.run('INSERT INTO produtos (produto, preco, estoque) VALUES (?, ?, ?)', [nomeProduto, preco, estoque], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id: this.lastID, ...produto });
            }
        });
    });
}

async function atualizarProduto(id, produto) {
    return new Promise((resolve, reject) => {
        const { produto: nomeProduto, preco, estoque } = produto;
        db.run('UPDATE produtos SET produto = ?, preco = ?, estoque = ? WHERE id = ?', [nomeProduto, preco, estoque, id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            if (this.changes === 0) {
                return reject(new Error('Produto não encontrado'))
            }

            resolve({ id, ...produto });

        });
    });
}

async function deletarProduto(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM produtos WHERE id = ?', [id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            if (this.changes === 0) {
                return reject(new Error('Produto não encontrado'))
            }
            resolve({ id });

        });
    });
}

async function buscarProdutoPorNome(nome) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM produtos WHERE produto = ?', [nome], (erro, row) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(row);
            }
        });
    });
}

async function atualizarEstoqueProduto(id, novoEstoque) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE produtos SET estoque = ? WHERE id = ?', [novoEstoque, id], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id, estoque: novoEstoque });
            }
        });
    });
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    buscarProdutoPorNome,
    atualizarProduto,
    deletarProduto,
    atualizarEstoqueProduto
};

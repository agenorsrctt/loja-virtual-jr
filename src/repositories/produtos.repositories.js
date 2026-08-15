const db = require('../database/connection');

async function listarProdutos(empresa_id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM produtos WHERE empresa_id = ?',[empresa_id], (erro, rows) => {
            if (erro) {
                return reject(erro);
            }
                
            resolve(rows);
            
        });
    });
}

async function buscarProdutoPorId(id, empresa_id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM produtos WHERE id = ? AND empresa_id = ?', [id, empresa_id], (erro, row) => {
            if (erro) {
                return reject(erro);
            }
            
            resolve(row);

        });
    });
}

async function criarProduto(produto, empresa_id) {
    return new Promise((resolve, reject) => {
        const { nomeProduto, preco, estoque } = produto;
        db.run('INSERT INTO produtos (produto, preco, estoque, empresa_id) VALUES (?, ?, ?, ?)', [nomeProduto, preco, estoque, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            } 
                
            resolve({ id: this.lastID, ...produto, empresa_id });
            
        });
    });
}

async function atualizarProduto(id, produto, empresa_id) {
    return new Promise((resolve, reject) => {
        const { nomeProduto, preco, estoque } = produto;
        db.run('UPDATE produtos SET produto = ?, preco = ?, estoque = ? WHERE id = ? AND empresa_id = ?', [nomeProduto, preco, estoque, id, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            if (this.changes === 0) {
                return reject(new Error('Produto não encontrado'))
            }

            resolve({ id, ...produto, empresa_id });

        });
    });
}

async function deletarProduto(id, empresa_id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM produtos WHERE id = ? AND empresa_id = ?', [id, empresa_id], function (erro) {
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

async function buscarProdutoPorNome(nome, empresa_id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM produtos WHERE produto = ? AND empresa_id = ?', [nome, empresa_id], (erro, row) => {
            if (erro) {
                return reject(erro);
            }
                
            resolve(row);
            
        });
    });
}

async function atualizarEstoqueProduto(id, novoEstoque, empresa_id) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE produtos SET estoque = ? WHERE id = ? AND empresa_id = ?', [novoEstoque, id, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }
                
            resolve({ id, estoque: novoEstoque });
            
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

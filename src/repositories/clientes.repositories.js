const db = require('../database/connection');

async function listarClientes() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM clientes', (erro, rows) => {
            if (erro) {
                reject(erro);
            } else {
                resolve(rows);
            }
        });
    });
}

async function buscarClientePorId(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM clientes WHERE id = ?', [id], (erro, row) => {
            if (erro) {
                reject(erro);
            } else {
                resolve(row);
            }
        });
    });
}


async function criarCliente(cliente) {
    return new Promise((resolve, reject) => {
        const { nome, telefone, email } = cliente;
        db.run('INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)', [nome, telefone, email], function (erro) {
            if (erro) {
                reject(erro);
            } else {
                resolve({ id: this.lastID, ...cliente });
            }
        });
    });
}

async function atualizarCliente(id, cliente) {
    return new Promise((resolve, reject) => {
        const { nome, telefone, email } = cliente;
        db.run('UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id = ?', [nome, telefone, email, id], function (erro) {
            if (erro) {
                reject(erro);
            } else {
                resolve({ id, ...cliente });
            }
        });
    });
}

async function deletarCliente(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM clientes WHERE id = ?', [id], function (erro) {
            if (erro) {
                reject(erro);
            } else {
                resolve({ message: 'Cliente deletado com sucesso' });
            }
        });
    });
}

module.exports = {
    listarClientes,
    buscarClientePorId,
    criarCliente,
    atualizarCliente,
    deletarCliente
};
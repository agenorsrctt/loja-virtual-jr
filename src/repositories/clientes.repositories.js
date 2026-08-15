const db = require('../database/connection');

async function listarClientes(empresa_id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM clientes where empresa_id = ?', [empresa_id], (erro, rows) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(rows);
            }
        });
    });
}

async function buscarClientePorId(id, empresa_id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM clientes WHERE id = ? AND empresa_id = ?', [id, empresa_id], (erro, row) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(row);
            }
        });
    });
}


async function criarCliente(cliente, empresa_id) {
    return new Promise((resolve, reject) => {
        const { nome, telefone, email } = cliente;
        db.run('INSERT INTO clientes (nome, telefone, email, empresa_id) VALUES (?, ?, ?, ?),' [nome, telefone, email, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            resolve({ id: this.lastID, ...cliente, empresa_id });

        });
    });
}

async function atualizarCliente(id, empresa_id, cliente) {
    return new Promise((resolve, reject) => {
        const { nome, telefone, email } = cliente;
        db.run('UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id = ? AND empresa_id = ?', [nome, telefone, email, id, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            if (this.changes === 0) {
                return reject({
                    mensagem: "Cliente não encontrado."
                })
            }

            resolve({ id, ...cliente, empresa_id });

        });
    });
}

async function deletarCliente(id, empresa_id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM clientes WHERE id = ? AND empresa_id = ?', [id, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            if (this.changes === 0) {
                return reject({
                    mensagem: "Cliente não encontrado."
                })
            }

            resolve({ message: 'Cliente deletado com sucesso' });

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
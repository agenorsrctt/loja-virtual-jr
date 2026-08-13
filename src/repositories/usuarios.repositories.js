const db = require('../database/connection');

async function listarUsuarios() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM usuarios', (erro, rows) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(rows);
            }
        });
    });
}

async function buscarUsuarioPorId(id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM usuarios WHERE id = ?', [id], (erro, row) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(row);
            }
        });
    });
}

async function criarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        const { nome, email, senha } = usuario;
        db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id: this.lastID, ...usuario });
            }
        });
    });
}

async function atualizarUsuario(id, usuario) {
    return new Promise((resolve, reject) => {
        const { nome, email, senha } = usuario;
        db.run('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, id], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ id, ...usuario });
            }
        });
    });
}

async function deletarUsuario(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM usuarios WHERE id = ?', [id], function (erro) {
            if (erro) {
                return reject(erro);
            } else {
                resolve({ message: 'Usuário deletado com sucesso' });
            }
        });
    });
}


module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
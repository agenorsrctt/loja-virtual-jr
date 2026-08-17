const db = require('../database/connection');

async function listarUsuarios(empresa_id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT u.nome, u.email, u.tipo, u.status, u.empresa_id FROM usuarios u WHERE empresa_id = ?', [empresa_id], (erro, rows) => {
            if (erro) {
                return reject(erro);
            } else {
                resolve(rows);
            }
        });
    });
}

async function buscarUsuarioPorId(id, empresa_id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT u.nome, u.email, u.tipo, u.status, u.empresa_id FROM usuarios u WHERE id = ? AND empresa_id = ?', [id, empresa_id], (erro, row) => {
            if (erro) {
                return reject(erro);
            }

            resolve(row);

        });
    });
}

async function criarUsuario(usuario, empresa_id) {
    return new Promise((resolve, reject) => {
        const { nome, email, senha, tipo, status, } = usuario;
        db.run('INSERT INTO usuarios (nome, email, senha, tipo, status, empresa_id) VALUES (?, ?, ?, ?, ?, ?)', [nome, email, senha, tipo, status, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            resolve({ id: this.lastID,
                mensagem: `Usuario ${usuario.nome} criado com sucesso!`,
                empresa_id
            });

        });
    });
}

async function atualizarUsuario(id, usuario, empresa_id) {
    return new Promise((resolve, reject) => {
        const { nome, email, senha, tipo, status } = usuario;
        db.run('UPDATE usuarios SET nome = ?, email = ?, senha = ? ,tipo = ?, status = ? WHERE id = ? AND empresa_id = ?', [nome, email, senha, tipo, status, id, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            if (this.changes === 0) {
                return reject(
                    new Error("Usuário não encontrado")
                );
            }

            resolve({ id, mensagem: `Usuario ${usuario.nome} atualizado com sucesso!`, empresa_id });

        });
    });
}

async function deletarUsuario(id, empresa_id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM usuarios WHERE id = ? AND empresa_id = ?', [id, empresa_id], function (erro) {
            if (erro) {
                return reject(erro);
            }

            if (this.changes === 0) {
                return reject(
                    new Error("Usuário não encontrado")
                );
            }

            resolve({ message: 'Usuário deletado com sucesso' });

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
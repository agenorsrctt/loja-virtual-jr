const db = require("../database/connection");

async function listarSolicitacoesCadastro() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM solicitacoesCadastro`, (error, rows) => {
            if(error) return reject(error);

            resolve(rows);
        })
    })
}

async function buscarSolicitacaoId(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM solicitacoesCadastro where id = ?`,[id], (error, row) => {
            if(error) return reject(error);

            resolve(row)
        })
    })
}

async function criarSolicitacao(solicitacaoCadastro) {
    return new Promise((resolve, reject) => {
        const { nome_empresa, cnpj, responsavel, email, senha, status } = solicitacaoCadastro;
        db.run(`INSERT INTO solicitacoesCadastro (nome_empresa, cnpj, responsavel, email, senha, status) VALUES(?, ?, ?, ?, ?, ?)`, [solicitacaoCadastro], function (error) {
            if(error) return reject(error);

            if(!this.lastID) return reject(error);

            resolve({
                id: this.lastID,
                mensagem: "Solicitação realizada com sucesso!",
                solicitacaoCadastro
            })
        })
    })
}

async function cancelarSolicitacaoId(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM solicitacoesCadastro WHERE id = ?`,[id], (error) => {
            if(error) return reject(error);

            if(this.changes === 0) return reject({
                mensagem: ("Erro na tentativa de cancelamento: ", + error)
            })

            resolve({
                mensagem: "Solicitação cancelada com sucesso!"
            })
        } )
    });
}

module.exports = {
    listarSolicitacoesCadastro,
    buscarSolicitacaoId,
    criarSolicitacao,
    cancelarSolicitacaoId
}
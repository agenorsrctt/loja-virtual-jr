const solicitacoesCadastro = require("../repositories/solicitacoesCadastro.repositories");

async function listarSolicitacoes() {
    const solicitacao = await solicitacoesCadastro.listarSolicitacoesCadastro();
    if(!solicitacao) throw new Error("Nenhuma solicitação encontrada.");
    
    return solicitacao;
}

async function listarSolicitacoesId(id) {
    const solicitacao = await solicitacoesCadastro.buscarSolicitacaoId(id);
    if(!solicitacao) throw new Error("Nenhuma solicitação encontrada.");
    
    return solicitacao;
}

async function criarSolicitacao(solicitacao) {
    try {
        const dados = await solicitacoesCadastro.criarSolicitacao(solicitacao);
        if(!dados) throw new Error("Erro ao criar solicitação.");

        return dados;
    } catch (error) {
        throw new Error("Erro:" + error);
    }
}

async function cancelarSolicitacao(id) {
    try {
        const solicitacao = await solicitacoesCadastro.cancelarSolicitacaoId(id);
        if(solicitacao) throw new Error("Erro ao deletar solicitação.");
        return solicitacao;
    } catch (error) {
        throw new Error("Erro:" + error);
    }
}

module.exports = {
    listarSolicitacoes, 
    listarSolicitacoesId, 
    criarSolicitacao, 
    cancelarSolicitacao
}
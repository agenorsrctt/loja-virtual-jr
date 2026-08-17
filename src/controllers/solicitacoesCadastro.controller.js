const solicitacoCadastroService = require("../services/solicitacoesCadastro.service");

async function listarSolicitacoes(req, res) {
    try {
        const { id } = req.params
        const solicitacao = await solicitacoCadastroService.listarSolicitacoes();
        res.status(200).json(solicitacao)
    } catch (error) {
        throw new Error("Erro: "+ error);
    }
}

async function listarSolicitacoesId(req, res) {
    try {
        const { id } = req.params
        const solicitacao = await solicitacoCadastroService.listarSolicitacoesId(id);
        res.status(200).json(solicitacao);
    } catch (error) {
        throw new Error("Erro: "+ error);
    }
}

async function criarSolicitacao(req, res) {
    try {
        const  solicitacao  = req.body;
        const solicitacao = await solicitacoCadastroService.criarSolicitacao(solicitacao);
        res.status(200).json(solicitacao);
    } catch (error) {
        throw new Error("Erro: "+ error);
    }
}

async function cancelarSolicitacao(req, res) {
    try {
        const  { id }  = req.params.id;
        const solicitacao = await solicitacoCadastroService.cancelarSolicitacao(id);
        res.status(200).json(solicitacao);
    } catch (error) {
        throw new Error("Erro: "+ error);
    }
}

module.exports = {
    listarSolicitacoes,
    listarSolicitacoesId,
    criarSolicitacao,
    cancelarSolicitacao
}
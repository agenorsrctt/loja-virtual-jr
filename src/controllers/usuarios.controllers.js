const usuariosService = require('../services/usuarios.services');

async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuariosService.listarUsuarios();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function buscarUsuarioPorId(req, res) {
    const { id } = req.params;
    try {
        const usuario = await usuariosService.buscarUsuarioPorId(id);
        res.json(usuario);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function criarUsuario(req, res) {
    const usuario = req.body;
    try {
        const novoUsuario = await usuariosService.criarUsuario(usuario);
        res.status(201).json(novoUsuario);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function atualizarUsuario(req, res) {
    const { id } = req.params;
    const usuario = req.body;
    try {
        const usuarioAtualizado = await usuariosService.atualizarUsuario(id, usuario);
        res.json(usuarioAtualizado);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function deletarUsuario(req, res) {
    const { id } = req.params;
    try {
        const usuarioDeletado = await usuariosService.deletarUsuario(id);
        res.json(usuarioDeletado);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
const usuariosService = require('../services/usuarios.services');

async function listarUsuarios(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;
        const usuarios = await usuariosService.listarUsuarios(empresa_id);
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function buscarUsuarioPorId(req, res) {
    const { id } = req.params;
    const empresa_id = req.usuario.empresa_id;
    try {
        const usuario = await usuariosService.buscarUsuarioPorId(id, empresa_id);
        res.json(usuario);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function criarUsuario(req, res) {
    const usuario = req.body;
    const empresa_id = req.usuario.empresa_id;
    try {
        const novoUsuario = await usuariosService.criarUsuario(usuario, empresa_id);
        res.status(201).json(novoUsuario);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function atualizarUsuario(req, res) {
    const { id } = req.params;
    const usuario = req.body;
    const empresa_id = req.usuario.empresa_id;
    try {
        const usuarioAtualizado = await usuariosService.atualizarUsuario(id, usuario, empresa_id);
        res.json(usuarioAtualizado);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function deletarUsuario(req, res) {
    const { id } = req.params;
    const empresa_id = req.usuario.empresa_id;
    try {
        const usuarioDeletado = await usuariosService.deletarUsuario(id, empresa_id);
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
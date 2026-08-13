const usuariosRepository = require('../repositories/usuarios.repositories');
const transaction = require('../database/transaction');

async function listarUsuarios() {
    const usuarios = await usuariosRepository.listarUsuarios();
    if (!usuarios) {
        throw new Error('Nenhum usuário encontrado');
    }
    return usuarios;
}

async function buscarUsuarioPorId(id) {
    const usuario = await usuariosRepository.buscarUsuarioPorId(id);
    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }
    return usuario;
}

async function criarUsuario(usuario) {
    try {
        await transaction.beginTransaction();
        const novoUsuario = await usuariosRepository.criarUsuario(usuario);
        if (!novoUsuario) {
            throw new Error('Usuario não criado');
        }

        if(!novoUsuario.email.includes("@")){
            throw new Error('Formato de e-mail incorreto, verificar.');
        }

        await transaction.commitTransaction();
        return novoUsuario;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao criar usuario: " + error.message)
    }
}

async function atualizarUsuario(id, usuario) {
    try {
        await transaction.beginTransaction();
        const usuarioAtualizado = await usuariosRepository.atualizarUsuario(id, usuario);
        if (!usuarioAtualizado) {
            throw new Error('Usuario não atualizado');
        }
        await transaction.commitTransaction();

        return usuarioAtualizado;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao atualizar usuario: " + error.message)
    }
}

async function deletarUsuario(id) {
    try {
        await transaction.beginTransaction();
        const usuarioDeletado = await usuariosRepository.deletarUsuario(id);
        if (!usuarioDeletado) {
            throw new Error('Usuario não encontrado');
        }
        await transaction.commitTransaction();
        return usuarioDeletado;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao deletar usuario: " + error.message)
    }
}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};

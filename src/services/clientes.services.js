const clientesRepository = require('../repositories/clientes.repositories');
const transaction = require("../database/transaction");

async function listarClientes() {
    const clientes = await clientesRepository.listarClientes();
    if (!clientes) {
        throw new Error('Nenhum cliente encontrado');
    }

    return clientes;
}

async function buscarClientePorId(id, empresa_id) {
    const cliente = await clientesRepository.buscarClientePorId(id, empresa_id);
    if (!cliente) {
        throw new Error('Cliente não encontrado');
    }
    return cliente;
}

async function criarCliente(cliente, empresa_id) {
    try {
        await transaction.beginTransaction();
        const novoCliente = await clientesRepository.criarCliente(cliente, empresa_id);
        if (!novoCliente) {
            throw new Error('Erro ao criar cliente');
        }
        await transaction.commitTransaction();
        return novoCliente;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao criar cliente: " + error.message)
    }
}

async function atualizarCliente(id, cliente, empresa_id) {
    try {
        await transaction.beginTransaction();
        const clienteAtualizado = await clientesRepository.atualizarCliente(id, cliente, empresa_id);
        if (!clienteAtualizado) {
            throw new Error('Erro ao atualizar cliente');
        }
        await transaction.commitTransaction();
        return clienteAtualizado;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao atualizar cliente: " + error.message)
    }
}

async function deletarCliente(id, empresa_id) {
    try {
        await transaction.beginTransaction();
        const clienteDeletado = await clientesRepository.deletarCliente(id, empresa_id);
        if (!clienteDeletado) {
            throw new Error('Erro ao deletar cliente');
        }
        await transaction.commitTransaction();
        return clienteDeletado;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao deletar cliente: " + error.message)
    }
}

module.exports = {
    listarClientes,
    buscarClientePorId,
    criarCliente,
    atualizarCliente,
    deletarCliente
};
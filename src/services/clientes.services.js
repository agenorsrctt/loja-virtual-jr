const clientesRepository = require('../repositories/clientes.repositories');
const transaction = require("../database/transaction");

async function listarClientes() {
    const clientes = await clientesRepository.listarClientes();
    if (!clientes) {
        throw new Error('Nenhum cliente encontrado');
    }

    return clientes;
}

async function buscarClientePorId(id) {
    const cliente = await clientesRepository.buscarClientePorId(id);
    if (!cliente) {
        throw new Error('Cliente não encontrado');
    }
    return cliente;
}

async function criarCliente(cliente) {
    try {
        await transaction.beginTransaction();
        const novoCliente = await clientesRepository.criarCliente(cliente);
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

async function atualizarCliente(id, cliente) {
    try {
        await transaction.beginTransaction();
        const clienteAtualizado = await clientesRepository.atualizarCliente(id, cliente);
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

async function deletarCliente(id) {
    try {
        await transaction.beginTransaction();
        const clienteDeletado = await clientesRepository.deletarCliente(id);
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
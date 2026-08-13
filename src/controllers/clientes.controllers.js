const clientesServices = require('../services/clientes.services');

async function listarClientes(req, res) {
    try {
        const clientes = await clientesServices.listarClientes();
        res.json(clientes);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function buscarClientePorId(req, res) {
    const { id } = req.params;
    try {
        const cliente = await clientesServices.buscarClientePorId(id);
        res.json(cliente);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function criarCliente(req, res) {
    const cliente = req.body;
    try {
        const novoCliente = await clientesServices.criarCliente(cliente);
        res.status(201).json(novoCliente);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function atualizarCliente(req, res) {
    const { id } = req.params;
    const cliente = req.body;
    try {
        const clienteAtualizado = await clientesServices.atualizarCliente(id, cliente);
        res.json(clienteAtualizado);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function deletarCliente(req, res) {
    const { id } = req.params;
    try {
        const clienteDeletado = await clientesServices.deletarCliente(id);
        res.json(clienteDeletado);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

module.exports = {
    listarClientes,
    buscarClientePorId,
    criarCliente,
    atualizarCliente,
    deletarCliente
};
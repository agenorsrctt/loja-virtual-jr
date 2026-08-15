const clientesServices = require('../services/clientes.services');

async function listarClientes(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;
        const clientes = await clientesServices.listarClientes(empresa_id);
        res.json(clientes);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function buscarClientePorId(req, res) {
    const { id } = req.params;
    const empresa_id = req.usuario.empresa_id; /* empresa_id vem do usuario autenticado */
    try {
        const cliente = await clientesServices.buscarClientePorId(id, empresa_id);
        res.json(cliente);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function criarCliente(req, res) {
    const cliente = req.body;
    const empresa_id = req.usuario.empresa_id;
    try {
        const novoCliente = await clientesServices.criarCliente(cliente, empresa_id);
        res.status(201).json(novoCliente);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function atualizarCliente(req, res) {
    const { id } = req.params;
    const {cliente} = req.body;
    const empresa_id = req.usuario.empresa_id;
    try {
        const clienteAtualizado = await clientesServices.atualizarCliente(id, cliente, empresa_id);
        res.json(clienteAtualizado);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
}

async function deletarCliente(req, res) {
    const { id } = req.params;
    const empresa_id = req.usuario.empresa_id;
    try {
        const clienteDeletado = await clientesServices.deletarCliente(id, empresa_id);
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
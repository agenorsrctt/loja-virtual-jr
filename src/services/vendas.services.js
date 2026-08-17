const vendasRepository = require('../repositories/vendas.repositories');
const produtosRepository = require('../repositories/produtos.repositories');
const itensPedidosRepository = require('../repositories/itens_venda.repositories');
const transaction = require('../database/transaction');

async function listarVendas(empresa_id) {
    const vendas = await vendasRepository.listarVendas(empresa_id);
    if (!vendas) {
        throw new Error('Nenhuma venda encontrada');
    }

    return vendas;
}

async function buscarVendaPorId(id, empresa_id) {
    const dados = await vendasRepository.buscarVendaPorId(id, empresa_id);
    if (!dados) {
        throw new Error("Nenhuma venda encontrada com este ID: " + id);
    }

    return dados;
}

async function buscarItensVendaPorId(id, empresa_id) {
    const dados = await vendasRepository.buscarItensVendaPorId(id, empresa_id);

    if (!dados || dados.length === 0) {
        throw new Error("Nenhuma venda encontrada com este ID: " + id);
    }

    const venda = {
        id: dados[0].id,
        data: dados[0].data_venda,
        total: dados[0].total,
        vendedor: dados[0].vendedor,
        cliente: dados[0].cliente,

        itens: dados.map(item => ({
            produto: item.produto,
            quantidade: item.quantidade,
            valor: item.preco_unitario
        }))
    };

    return venda;
}

async function criarVenda(usuario_id, venda, empresa_id) {
    try {

        await transaction.beginTransaction();

        // Validar os dados da venda    
        const { cliente_id, itens } = venda;
        if (!cliente_id || !itens || itens.length === 0) {
            throw new Error('Dados da venda incompletos');
        }

        if (!usuario_id) {
            throw new Error('Usuário não informado');
        }

        // Calcular o total da venda
        let total = 0;

        // Define status inicial
        const status = 'pendente';

        // Criar a venda
        const novaVenda = await vendasRepository.criarVenda({ cliente_id, usuario_id, total, status }, empresa_id);

        // Verificar se os produtos existem e se há estoque suficiente
        for (const item of itens) {
            const produto = await produtosRepository.buscarProdutoPorId(item.produto_id, empresa_id);
            if (!produto) {
                throw new Error(`Produto com ID ${item.produto_id} não encontrado`);
            }

            if (item.quantidade <= 0) {
                throw new Error(`Quantidade deve ser positivo`);
            }

            if (produto.estoque < item.quantidade) {
                throw new Error(`Estoque insuficiente para o produto ${produto.produto}`);
            }

            // Calcular o total da venda
            total += produto.preco * item.quantidade;

            // Criar os itens do pedido
            await itensPedidosRepository.criarItemPedido({
                venda_id: novaVenda.id,
                produto_id: item.produto_id,
                quantidade: item.quantidade,
                preco_unitario: produto.preco
            });

            // Atualizar o estoque do produto
            const novoEstoque = produto.estoque - item.quantidade;
            await produtosRepository.atualizarEstoqueProduto(item.produto_id, novoEstoque, empresa_id);
        }

        // Atualizar o total da venda
        await vendasRepository.atualizarTotalVenda(novaVenda.id, total, empresa_id);

        novaVenda.total = total; // Atualizar o total na venda retornada

        await transaction.commitTransaction();

        return novaVenda;

    } catch (erro) {
        await transaction.rollbackTransaction();
        throw Error('Erro ao criar venda: ' + erro.message);
    }
}

async function atualizarStatus(id, status, empresa_id) {
    try {
        await transaction.beginTransaction();
        const statusPagamento = status;
        if (!statusPagamento) {
            throw new Error("Nenhum status definido!");
        }

        const venda = await vendasRepository.buscarVendaPorId(id, empresa_id);
        if (!venda) {
            throw new Error("Venda não localizada.");
        }

        await vendasRepository.atualizarStatus(venda.id, statusPagamento, empresa_id);
        await transaction.commitTransaction();

        return statusPagamento
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error('Erro ao atualizar status da venda: ' + error.message);
    }
}


module.exports = {
    listarVendas,
    buscarVendaPorId,
    criarVenda,
    atualizarStatus,
    buscarItensVendaPorId
};
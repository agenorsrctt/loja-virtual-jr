const produtosRepository = require('../repositories/produtos.repositories');
const transaction = require("../database/transaction");

async function listarProdutos() {
    const produtos = await produtosRepository.listarProdutos();
    if (!produtos) {
        throw new Error('Nenhum produto encontrado');
    }

    return produtos;
}

async function buscarProdutoPorId(id) {
    const produto = await produtosRepository.buscarProdutoPorId(id);
    if (!produto) {
        throw new Error('Produto não encontrado');
    }

    return produto;
}

async function criarProduto(produto) {
    try {
        await transaction.beginTransaction()
        const novoProduto = await produtosRepository.criarProduto(produto);

        if (!novoProduto) {
            throw new Error('Produto não criado');
        }

        if (novoProduto.preco <= 0) {
            throw new Error('O preço do produto deve ser maior que zero');
        }

        if (novoProduto.estoque <= 0) {
            throw new Error('O estoque do produto não pode ser negativo');
        }

        await transaction.commitTransaction();
        return novoProduto;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao criar produto: " + error.message);
    }
}

async function atualizarProduto(id, produto) {
    try {
        await transaction.beginTransaction()
        const produtoAtualizado = await produtosRepository.atualizarProduto(id, produto);
        if (!produtoAtualizado) {
            throw new Error('Erro ao atualizar produto');
        }

        if (produtoAtualizado.preco <= 0) {
            throw new Error('O preço do produto deve ser maior que zero');
        }

        if (produtoAtualizado.estoque <= 0) {
            throw new Error('O estoque do produto não pode ser negativo');
        }
        await transaction.commitTransaction();
        return produtoAtualizado;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao atualizar produto: " + error.message);
    }
}

async function deletarProduto(id) {
    try {
        await transaction.beginTransaction();
        const produtoDeletado = await produtosRepository.deletarProduto(id);
        if (!produtoDeletado) {
            throw new Error('Produto não localizado para deletar');
        }
        await transaction.commitTransaction();
        return produtoDeletado;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao delatar produto: " + error.message)
    }
}

async function atualizarEstoqueProduto(id, quantidade) {
    try {
        await transaction.beginTransaction();
        const produtoAtualizado = await produtosRepository.atualizarEstoqueProduto(id, quantidade);
        if (!produtoAtualizado) {
            throw new Error('Erro ao atualizar estoque do produto');
        }

        if (produtoAtualizado.estoque < 0) {
            throw new Error('O estoque do produto não pode ser negativo');
        }
        await transaction.commitTransaction();
        return produtoAtualizado;
    } catch (error) {
        await transaction.rollbackTransaction();
        throw Error("Erro ao atualizar estque: " + error.message)
    }
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    atualizarEstoqueProduto,
    deletarProduto
};

const db = require('./connection');

db.serialize(() => {
    db.run(`PRAGMA foreign_keys = ON`),

        db.run(`CREATE TABLE IF NOT EXISTS solicitacoesCadastro(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_empresa TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        responsavel TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL,
        status TEXT NOT NULL
    )`),

        db.run(`CREATE TABLE IF NOT EXISTS empresas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_empresa TEXT NOT NULL,
        cnpj TEXT NOT NULL UNIQUE
    )`),

        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL,
        tipo TEXT NOT NULL,
        status TEXT NOT NULL,
        empresa_id INTEGER,
        FOREIGN KEY (empresa_id) references empresas(id)
    )`),

        db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL,
        email TEXT NOT NULL,
        empresa_id INTEGER NOT NULL,
        FOREIGN KEY (empresa_id) references empresas(id)
    )`),

        db.run(`CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto TEXT NOT NULL,
        preco REAL NOT NULL,
        estoque INTEGER NOT NULL,
        empresa_id INTEGER NOT NULL,
        FOREIGN KEY (empresa_id) references empresas(id)
    )`),

        db.run(`CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        usuario_id INTEGER NOT NULL,
        data_venda timestamp DEFAULT CURRENT_TIMESTAMP,
        total REAL NOT NULL,
        status TEXT NOT NULL,
        empresa_id INTEGER NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (empresa_id) references empresas(id)
    )`),

        db.run(`CREATE TABLE IF NOT EXISTS itens_venda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        venda_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        preco_unitario REAL NOT NULL,
        FOREIGN KEY (venda_id) REFERENCES vendas(id),
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
    )`)
})

module.exports = db;
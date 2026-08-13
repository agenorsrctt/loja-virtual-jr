const db = require('./connection');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )`),

    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE
    )`),

    db.run(`CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto TEXT NOT NULL,
        preco REAL NOT NULL,
        estoque INTEGER NOT NULL
    )`),

    db.run(`CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        usuario_id INTEGER NOT NULL,
        data_venda timestamp DEFAULT CURRENT_TIMESTAMP,
        total REAL NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
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
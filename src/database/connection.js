const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const caminhoBanco = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(caminhoBanco, (erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
  } else {
    console.log('Conectado ao banco de dados com sucesso');
  }
});

module.exports = db;
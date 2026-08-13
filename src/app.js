const express = require('express');
const app = express();

app.use(express.json());

require('./database/init');

const produtosRoutes = require('./routes/produtos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const clientesRoutes = require('./routes/clientes.routes');

app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/clientes', clientesRoutes);

console.log("App iniciado com sucesso");

module.exports = app;
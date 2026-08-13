#!/bin/bash
mkdir -p src/{controllers,database,middlewares,routes,repositories,services}

touch src/controllers/clientes.controllers.js
touch src/controllers/usuarios.controllers.js
touch src/controllers/produtos.controllers.js
touch src/controllers/pedidos.controllers.js
touch src/controllers/itens_pedidos.controllers.js

touch src/routes/clientes.routes.js
touch src/routes/usuarios.routes.js
touch src/routes/produtos.routes.js
touch src/routes/pedidos.routes.js
touch src/routes/itens_pedidos.routes.js

touch src/repositories/clientes.repositories.js
touch src/repositories/usuarios.repositories.js
touch src/repositories/produtos.repositories.js
touch src/repositories/pedidos.repositories.js
touch src/repositories/itens_pedidos.repositories.js

touch src/services/clientes.services.js
touch src/services/usuarios.services.js
touch src/services/produtos.services.js
touch src/services/pedidos.services.js
touch src/services/itens_pedidos.services.js

touch src/database/init.js
touch src/database/connection.js
touch src/middlewares/auth.js

touch src/app.js
touch src/server.js


echo "Estrutura criada com sucesso"
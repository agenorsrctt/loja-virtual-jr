const vendasControllers = require("../controllers/vendas.controllers");
const express = require("express");
const router = express.Router();

router.get("/", vendasControllers.listarVendas);
router.get("/:id", vendasControllers.buscarVendaPorId);
router.post("/", vendasControllers.criarVenda);
router.put("/:id", vendasControllers.atualizarStatus);

module.exports = router;
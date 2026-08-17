const express = require("express");
const router = express.Router();
const solicitacoesCadastroController = require("../controllers/solicitacoesCadastro.controller");
const auth = require("../middlewares/auth");


router.get("/", auth.somenteAdmin, auth.autenticar, solicitacoesCadastroController.listarSolicitacoes);
router.get("/:id", auth.somenteAdmin, auth.autenticar, solicitacoesCadastroController.listarSolicitacoesId);
router.post("/", auth.somenteAdmin, solicitacoesCadastroController.criarSolicitacao);
router.delete("/:id", auth.somenteAdmin, auth.autenticar, solicitacoesCadastroController.cancelarSolicitacao);

module.exports = router;
const jwt = require("jsonwebtoken");

function gerarToken(usuario) {

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            empresa_id: usuario.empresa_id,
            tipo: usuario.tipo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }

    );

    return token;
}

function autenticar(req, res, next) {
    const authHeaders = req.headers.authorization;

    if(!authHeaders) {
        return res.status(401).json({
            mensagem: "Token não informado!"
        })
    }

    const token = authHeaders.split(" ")[1];

    try {
        const usuario = jwt.verify(
            token, process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado!"
        })
    }
}

function somenteAdmin(req, res, next) {
    if(req.usuario.tipo !== "admin") {
        return res.status(403).json({
            mensagem: "Você não tem permissão!"
        })
    }

    next();
}

module.exports = {
    gerarToken, autenticar, somenteAdmin
}
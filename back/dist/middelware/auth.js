"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    const { token } = req.headers;
    console.log(token);
    if (token === "autenticado")
        next();
    else
        res.status(400).json({ mesasage: "Error. Falta autenticacion" });
};
exports.auth = auth;

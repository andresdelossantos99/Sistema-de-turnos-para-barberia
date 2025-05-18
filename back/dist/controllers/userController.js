"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const userService_1 = require("../services/userService");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUserService)();
        res.status(200).json({
            msg: "Obtener todos los usuarios",
            data: users
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield (0, userService_1.getUserByIdService)(parseInt(req.params.id, 10));
        if (!userFound) {
            res.status(404).json({
                msg: "Usuario no encontrado",
                data: null
            });
            return userFound;
        }
        res.status(200).json({
            msg: "Obtener el detalle de un usario especifico",
            data: userFound
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newuser = yield (0, userService_1.registerUserService)(req.body);
        res.status(200).json({
            msg: "Registro de un nuevo usuario",
            data: newuser
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //await funcion ponemos dsp()
        res.status(200).json({
            msg: "Login de un usuario",
            data: req.body
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        });
    }
});
exports.loginUserController = loginUserController;

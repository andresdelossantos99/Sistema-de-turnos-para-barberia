"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Base de datos conectada");
    server_1.default.listen(envs_1.config.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${envs_1.config.PORT}`);
    });
})
    .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
});

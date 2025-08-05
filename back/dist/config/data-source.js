"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_entity_1 = require("../entities/User.entity");
const Credential_entity_1 = require("../entities/Credential.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.config.DB_HOST,
    port: envs_1.config.DB_PORT,
    username: envs_1.config.DB_USERNAME,
    password: envs_1.config.DB_PASSWORD,
    database: envs_1.config.DB_NAME,
    synchronize: envs_1.config.DB_SYNCHRONIZE,
    dropSchema: envs_1.config.DB_DROP_SCHEMA,
    logging: envs_1.config.DB_LOGGING,
    entities: ["src/entities/**/*.ts"],
});
exports.UserModel = exports.AppDataSource.getRepository(User_entity_1.User);
exports.CredentialModel = exports.AppDataSource.getRepository(Credential_entity_1.Credential);

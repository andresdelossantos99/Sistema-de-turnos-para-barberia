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
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUserService = void 0;
const credentialServices_1 = require("../services/credentialServices");
const data_source_1 = require("../config/data-source");
const validationUserAge_1 = require("../utils/validationUserAge");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find({
        relations: { credentials: true }
    });
    return users;
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.UserModel.findOne({
        where: { id: id }, relations: ['appointments']
    });
    if (!userFound)
        throw new Error(`"El usuario con el Id:${id} no fue encontrado"`);
    return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validationUserAge_1.validateUserAge)(user.name, user.birthdate);
    const credentialId = yield (0, credentialServices_1.getCredentialService)(user.username, user.password);
    const newUser = data_source_1.UserModel.create({
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate),
        nDni: user.nDni,
        credentials: credentialId
    });
    yield data_source_1.UserModel.save(newUser);
    return newUser;
});
exports.registerUserService = registerUserService;
const loginUserService = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialServices_1.checkUserCredentials)(userCredentials.username, userCredentials.password);
    const userFound = yield data_source_1.UserModel.findOne({
        where: {
            credentials: { id: credentialId }
        },
    });
    return userFound;
});
exports.loginUserService = loginUserService;

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
exports.getCredentialService = void 0;
const credentials = [];
let id = 1;
const checkUserExist = (username) => {
    const usernameFound = credentials.find(cred => cred.username === username);
    if (usernameFound)
        throw Error(`el usuario con username ${username} ya existe, intente con otro nombre de usuario`);
};
// export const checkUserCredential = async (username:string, password: string) =>{
//     const usernameFound: ICredential|undefined  = credentials.find(cred=> cred.username === username)
const getCredentialService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    checkUserExist(username);
    const credential = {
        id: id,
        username: username,
        password: password
    };
    credentials.push(credential);
    id++;
    return credential.id;
});
exports.getCredentialService = getCredentialService;

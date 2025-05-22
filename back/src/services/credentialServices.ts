import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential.entity";
import { CustomError } from "../utils/customError";
import bcrypt from "bcryptjs";


const bycrypt = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
const checkUserExist = async (username: string): Promise<void> => {
  const usernameFound: Credential |null =await CredentialModel.findOne
  ({
     where: {
       username 
      }
     });
  if (usernameFound) {
    throw new CustomError(400, `El usuario ${username} ya existe, intente con otro nombre de usuario`);
  }
};
export const checkUserCredentials = async (username: string, password: string): Promise<number> => {  
  const usernameFound: Credential | null = await CredentialModel.findOne({
    where: { username },
  });
  
  if (!usernameFound) {
    throw new CustomError(400, `Credenciales incorrectas`);
  }
  
  const isPasswordValid = await bcrypt.compare(password, usernameFound.password);
  
  if (!isPasswordValid) {
    throw new CustomError(400, `Credenciales incorrectas`);
  }
  
  return usernameFound.id;
};

export const getCredentialService = async (username: string, password: string): Promise<Credential> => {
 await checkUserExist(username);
 const bcryptPassword = await bycrypt(password);
  const newCredential = CredentialModel.create({
    username,
    password: bcryptPassword,
  }); 
  await CredentialModel.save(newCredential);
  return newCredential;
};
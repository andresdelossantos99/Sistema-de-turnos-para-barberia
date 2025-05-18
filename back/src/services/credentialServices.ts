import { ICredential } from "../interfaces/ICredential";

const credentials: ICredential [] = []

let id:number = 1


const checkUserExist = (username:string):void =>{
    const usernameFound: ICredential | undefined = credentials.find(cred=> cred.username === username)
    if (usernameFound) throw Error (`el usuario con username ${username} ya existe, intente con otro nombre de usuario`)
    }
           
// export const checkUserCredential = async (username:string, password: string) =>{
//     const usernameFound: ICredential|undefined  = credentials.find(cred=> cred.username === username)

export const getCredentialService = async (username:string, password: string):Promise <number> =>{
    checkUserExist  (username)
       const credential = {
        id: id,
        username:username,
        password: password
    }
    credentials.push(credential)
    id++
    return credential.id
}
 
    
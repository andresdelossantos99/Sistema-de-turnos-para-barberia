    import {IUser}  from "../interfaces/IUser"
    import {UserDto, UserRegisterDto} from "../dto/UserDto"
    import { getCredentialService } from "../services/credentialServices"

    const users: IUser[] = []

    let id: number = 1;
    
    export const getUserService = async (): Promise<UserDto[]>=>{
        const nuevoArray = users.map(user =>{
           const objetoUser ={
                id: user.id,
                name: user.name,
                email:user.email
            }
            return objetoUser
        })
        return nuevoArray
    }
export const getUserByIdService = async (id: number): Promise<UserDto | undefined> => {
    const userFound = users.find((user: IUser) => user.id === id);
    if (!userFound)throw new Error(`"El usuario con el Id:${id} no fue encontrado"`);
    return {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email
    };
}
    export const registerUserService = async (user: UserRegisterDto)=> {
    const credentialId: number = await getCredentialService(user.username, user.password)
    const newUser: IUser = {
        id: id++,
        name: user.name,
        email: user.email,
        nDni: user.nDni,
        birthdate: new Date(user.birthdate),
        credentialsId: credentialId
    }
        users.push(newUser)
         return newUser
}

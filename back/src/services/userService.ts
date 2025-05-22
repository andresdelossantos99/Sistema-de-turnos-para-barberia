    import {UserDto, UserRegisterDto, UserLoginDto } from "../dto/UserDto"
    import {  checkUserCredentials, getCredentialService } from "../services/credentialServices"
    import { UserModel } from "../config/data-source"
    import { User } from "../entities/User.entity"
    import { validateUserAge } from "../utils/validationUserAge"
    import { Credential } from "../entities/Credential.entity"
 
    export const getUserService = async ():Promise<UserDto[]> => {
       const users: User[] = await UserModel.find({
        relations: {credentials: true}})
        return users;
    }
export const getUserByIdService = async (id: number): Promise<UserDto | undefined> => {
   const userFound: User | null = await UserModel.findOne({
    where: {id:id}, relations:['credentials']})
    if (!userFound)throw new Error(`"El usuario con el Id:${id} no fue encontrado"`);
    return userFound
}
export const registerUserService = async (user: UserRegisterDto): Promise<User> => {
  validateUserAge(user.name, user.birthdate);
  const credentialId: Credential = await getCredentialService(user.username, user.password);
const newUser: User = UserModel.create({
  name: user.name,
  email: user.email,
  birthdate: new Date (user.birthdate),
  nDni: user.nDni,
  credentials: credentialId
})
await UserModel.save(newUser);  
return newUser
}
export const loginUserService = async (userCredentials: UserLoginDto): Promise<User | null> => {
  const credentialId: number = await checkUserCredentials(userCredentials.username, userCredentials.password);
  const userFound: User | null = await UserModel.findOne({
    where: {
      credentials: { id: credentialId}
    },
  });
  return userFound;
}


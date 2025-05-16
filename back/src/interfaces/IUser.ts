import {loginDto}  from "../dto/UserDto";

interface IUser {
    id: number;
    name: string;
    email: string;
    birthdate: string;
    nDni: number;
    login: loginDto;
}
export default IUser;
 
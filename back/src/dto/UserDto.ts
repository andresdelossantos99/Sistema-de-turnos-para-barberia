export interface UserRegisterDto{
    name : string,
    nDni: number,
    email: string,
    birthdate: string,
    username: string,   
    password: string,
    }
export interface UserDto{
    id: number;
    name: string;
    email: string;
}
export interface UserLoginDto{
    email: string;
    password: string;
}
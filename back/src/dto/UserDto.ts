interface UserDto{
    name : string,
    email: string,
    birthday: string,
    dni: number
    login:loginDto
    }

interface loginDto{
    credentialId:number,
    username: string,
    password: string
}
export { UserDto, loginDto}
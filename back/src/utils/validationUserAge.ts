import { CustomError} from '../utils/customError';

export const validateUserAge = (username: string, date: Date): void => {
    const today = new Date().getFullYear()
    const userBirth = new Date(date).getFullYear()
    const age = today - userBirth
    if(userBirth > today) throw new CustomError(400, `El usuario ${username} no puede ser menor de edad`)
    if(age < 18) throw new CustomError(400, `El usuario ${username} no puede ser menor de edad`)
    }

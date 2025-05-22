import { Request, Response } from "express";
import { UserRegisterDto, UserLoginDto, UserDto } from "../dto/UserDto";
import { getUserService, getUserByIdService, registerUserService, loginUserService } from "../services/userService";
import { User } from "../entities/User.entity";

 export const getUsersController = async (req:Request, res:Response): Promise<void>=> {
    try{
        const users: UserDto[] = await getUserService()
        res.status(200).json({
            msg:"Obtener todos los usuarios",
            data:users
});
}catch(error) {
    res.status(500).json({
        msg:"ocurrio un error",
        error:error instanceof Error ? error.message : "Error desconocido"
    })}}
    export const getUserByIdController = async (req: Request<{id: string}>, res:Response): Promise<void> =>{
        try {
            const userFound: UserDto | undefined = await getUserByIdService(parseInt(req.params.id,10))
            if(!userFound) {
                res.status(404).json({
                    msg:"Usuario no encontrado",
                    data:null
                })
                return userFound
            }
            res.status(200).json({
                msg:"Obtener el detalle de un usario especifico",
                data:userFound
            })
            } catch (error) {
                res.status(404).json({
                    msg:"Ocurrio un error",
                    error: error instanceof Error ? error.message : "Error desconocido"
                })
            }
        }
    export const registerUserController = async (req:Request<unknown,unknown,UserRegisterDto>,
        res: Response): Promise<void>=>{
        try {
            const newUser: User  = await registerUserService(req.body)
            res.status(201).json({
                msg:"Registro de un nuevo usuario",
                data:newUser
            })
        } catch (error) {
            res.status(400).json({
                msg:"Ocurrio un error",
                error: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }
    export const loginUserController = async (req:Request< unknown, unknown, UserLoginDto>, res:Response): Promise<void>=>{

        try {
         const user: User | null = await loginUserService(req.body)
            res.status(200).json({
                msg:"Login de un usuario",
                data:user
            })
        } catch (error) {
            res.status(400).json({
                msg:"Ocurrio un error",
                error: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }   
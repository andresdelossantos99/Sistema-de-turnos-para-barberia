import { Request, Response } from "express";
import { UserRegisterDto, UserLoginDto, UserDto } from "../dto/UserDto";
import { getUserService, getUserByIdService, registerUserService } from "../services/userService";
import { IUser } from "../interfaces/IUser";


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
                res.status(500).json({
                    msg:"Ocurrio un error",
                    error: error instanceof Error ? error.message : "Error desconocido"
                })
            }
        }
    export const registerUserController = async (req:Request<unknown,unknown,UserRegisterDto>,
        res: Response): Promise<void>=>{
        try {
            const newuser: IUser = await registerUserService(req.body)
            res.status(200).json({
                msg:"Registro de un nuevo usuario",
                data:newuser
            })
        } catch (error) {
            res.status(500).json({
                msg:"Ocurrio un error",
                error: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }
    export const loginUserController = async (req:Request< unknown, unknown, UserLoginDto>, res:Response): Promise<void>=>{

        try {
            //await funcion ponemos dsp()
            res.status(200).json({
                msg:"Login de un usuario",
                data:req.body
            })
        } catch (error) {
            res.status(500).json({
                msg:"Ocurrio un error",
                error: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }   
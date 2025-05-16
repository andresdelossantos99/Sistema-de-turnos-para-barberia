import { Request, Response } from "express";
import { createUserService, getUserService, deleteUserService } from "../services/userService";
import IUser from "../interfaces/IUser";



export const createUser = async (req:Request, res:Response)=> {
    const { name, username, email, birthday, dni} = req.body;
    const newUser: IUser = await createUserService({ name, username, email, birthday, dni })
    res.status(201).json(newUser) 
    }

export const getUsersService = async (req: Request, res: Response): Promise<void>=>{
    try{
        const users = await getUserService();           
        res.status(200).json({
            msg:"obtener el listado de todos los usuarios",
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body
    await deleteUserService(id)
   res.status(200).json({message:"Eliminado correctamente"})
}


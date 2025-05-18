import { Request, Response } from "express";    
import { IAppointments } from "../interfaces/IAppointments";
import { AppointmentsRegisterDto } from "../dto/AppointmentRegisterDto";
import { getAppointmentService , getAppointmentsByIdService, cancelAppointmentsService, registerAppointmentsService } from "../services/appointmentsService";    
     

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments: IAppointments[] = await getAppointmentService();               
    res.status(200).json({
        msg: "Este es el listado de todos los turnos",
        data: appointments
    })
 } catch (error) {
   res.status(500).json({
       msg: "Ocurrio un error",
       error: error instanceof Error ? error.message : "Error desconocido"
   })
  }
}
export const getAppointmentsByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
       const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ msg: "El ID proporcionado no es válido" });
      return;
    }       
        const appointmentFound: IAppointments | null = await getAppointmentsByIdService(id);
        if (!appointmentFound) {
            res.status(404).json({
                msg: "Turno no encontrado",
                data: null
            })
            return;
        }
        res.status(200).json({
            msg: "Obtener el detalle de un turno especifico",
            data: appointmentFound
        })
    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        })
    }
}   
export const registerAppointmentsController = async (req: Request<unknown, unknown, AppointmentsRegisterDto>, res: Response): Promise<void> => {
  
    try {
        const appointmentCreate: IAppointments = await registerAppointmentsService(req.body);
    res.status(201).json({
            msg: "Agendar un nuevo turno",
            data: appointmentCreate
        })
    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        })
    }
}
export const cancelStatusAppointmentsController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        await cancelAppointmentsService(parseInt(req.params.id, 10));
        res.status(200).json({
            msg: "Cita cancelada con exito",
        })
    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        })
    }
}
import { Request, Response } from "express";    
import { AppointmentsRegisterDto } from "../dto/AppointmentRegisterDto";
import { getAppointmentService , getAppointmentsByIdService, cancelAppointmentsService, registerAppointmentsService } from "../services/appointmentsService";    
import { Appointment } from "../entities/Appointment.entity";

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments: Appointment[] = await getAppointmentService();               
    res.status(200).json({
        msg: "Este es el listado de todos los turnos",
        data: appointments
    })
 } catch (error) {
   res.status(400).json({
       msg: "Error al obtener el listado de turnos",
       error: error instanceof Error ? error.message : "Error desconocido"
   })
  }
}
export const getAppointmentsByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
       const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(404).json({ msg: "El ID proporcionado no es válido" });
      return;
    }       
        const appointmentFound: Appointment | null = await getAppointmentsByIdService(id);
        if (!appointmentFound) {
            res.status(404).json({
                msg: "Turno no encontrado",
                data: null
            })
            return;
        }
        res.status(200).json({
            msg: "Obtencion de turno por ID",
            data: appointmentFound
        })
    } catch (error) {
        res.status(404).json({
            msg: "Ocurrio un error",
            error: error instanceof Error ? error.message : "Error desconocido"
        })
    }
}   
export const registerAppointmentsController = async (req: Request<unknown, unknown, AppointmentsRegisterDto>, res: Response): Promise<void> => {
  
    try {
        const appointmentCreate: Appointment = await registerAppointmentsService(req.body);
    res.status(201).json({
            msg: "Agendar un nuevo turno",
            data: appointmentCreate
        })
    } catch (error) {
        res.status(400).json({
            msg: "Los datos son incorrectos",
            error: error instanceof Error ? error.message : "Error desconocido"
        })
    }
}
        export const cancelStatusAppointmentsController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
            try {
                await cancelAppointmentsService(parseInt(req.params.id, 10));
                console.log("ID recibido:", req.params.id)
                res.status(200).json({
                    msg: "Cita cancelada con exito",
                })
            } catch (error) {
                res.status(404).json({
                    msg: "El turno no fue encontrado",
                    error: error instanceof Error ? error.message : "Error desconocido"
                })
            }
        }
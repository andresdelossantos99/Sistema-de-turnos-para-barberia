import { AppointmentsRegisterDto } from "../dto/AppointmentRegisterDto";
import { Status} from "../interfaces/IAppointments";
import { getUserByIdService } from "./userService";
import { AppointmentRepository } from "../repositories/Appointment_Repository"
import { validateAppointmentCanBeCancelled } from "../utils/validateCancelation";
import { CustomError } from "../utils/customError";
import { Appointment } from "../entities/Appointment.entity";


export const getAppointmentService = async ():Promise<Appointment[]> =>{
  const appointments:Appointment[] = await AppointmentRepository.find()
  if(appointments.length === 0)throw new CustomError(404, "No hay turnos registrados")
    return appointments  
}
export const getAppointmentsByIdService = async(id: number):Promise<Appointment>=> {
  const appointmentFound = await AppointmentRepository.findOne({
    where:{
      id
    },   
    relations: ["user"]
  } )
  if(!appointmentFound) throw Error (`La cita con Id: ${id} no fue encontrado`)
  return appointmentFound;
}       
export const registerAppointmentsService = async (appointment: AppointmentsRegisterDto):Promise<Appointment>=> {
await getUserByIdService(appointment.userId)
    AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time)
    await AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time)
    const newAppointment = AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user:{
            id: appointment.userId
        }
    })
    return await AppointmentRepository.save(newAppointment)
}
export const cancelAppointmentsService = async (id: number):Promise<void> => {
  const appointmentFound = await AppointmentRepository.findOne({
        where: {
            id
        }
    })
    if(!appointmentFound) throw new CustomError (400, "El turno no existe")
    validateAppointmentCanBeCancelled(appointmentFound.date, appointmentFound.time)
    appointmentFound.status = Status.cancelled
    await AppointmentRepository.save(appointmentFound)
}
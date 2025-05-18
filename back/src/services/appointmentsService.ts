import { AppointmentsRegisterDto } from "../dto/AppointmentRegisterDto";
import {IAppointments, Status} from "../interfaces/IAppointments";
import { getUserByIdService } from "./userService";


const appointments: IAppointments[] = []

let id: number = 1;

export const getAppointmentService = async ():Promise<IAppointments[]> =>{
  return appointments
}
export const getAppointmentsByIdService = async(id: number):Promise<IAppointments>=> {
  const appointmentFound = appointments.find(app=> app.id === id )
  if(!appointmentFound) throw Error (`La cita con Id: ${id} no fue encontrado`)
  return appointmentFound;
}       
export const registerAppointmentsService = async (appointment: AppointmentsRegisterDto)=> {
 const userFound = await getUserByIdService(appointment.userId)
if (!userFound) { throw new Error(`El usuario con el Id:${appointment.userId} no fue encontrado`);
}
const appointmentFound = appointments.find(app => app.userId === appointment.userId && app.time === appointment.time && new Date(app.date).getTime()=== new Date(appointment.date).getTime())
if(appointmentFound) throw Error (`La cita ya existe`)
  const newAppointment: IAppointments = {
    id: id++,
    date: appointment.date,
    time: appointment.time,
    status: Status.active,
    userId: userFound?.id || 0
  }
  appointments.push(newAppointment);
  return newAppointment;
}
export const cancelAppointmentsService = async (id: number):Promise<IAppointments> => {
  const appointmentFound = await getAppointmentsByIdService(id)
  appointmentFound.status = Status.cancelled
  return appointmentFound}
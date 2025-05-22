import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import { CustomError } from "../utils/customError";

  export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
    validateAllowAppointment: function(date: Date, time: string): void{
        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0)
        const today = new Date()

        const appointmentDateInArg = new Date (appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const nowInArgentina = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);

        if(appointmentDateInArg < nowInArgentina){
            throw new CustomError(400, "Fecha de turno invalida")
        }
        const diffMilliSeconds = today.getTime() - appointmentDate.getTime()
        const diffInHours = diffMilliSeconds / (1000 * 60 * 60)
        if( diffInHours > 24) throw new CustomError(400, "Los turnos deben agendarse coon al menos 24 horas de anticipacion")

        const dayOfWeek = appointmentDateInArg.getUTCDate()
        if(dayOfWeek === 5 || dayOfWeek === 6){
            throw new CustomError(400, "No se pueden agendar turno los fines de semana")
        }
        if (hours < 9 || hours > 20){
            throw new CustomError(400, "Los turnos deben agendarse entre las 9am y las 9pm")
        }
    },
    validateExistingAppointment: async function (userId: number, date: Date, time: string): Promise<void> {
        const appointmentFound = await this.findOne({
            where: {
                user: {
                    id: userId
                },
                time: time,
                date: date
            }
        })
        if(appointmentFound) throw new CustomError(400, "Ya tiene agendado un turno con la misma fecha y hora")
    }
})


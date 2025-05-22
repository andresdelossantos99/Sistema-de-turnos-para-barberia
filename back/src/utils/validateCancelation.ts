
import { CustomError } from "./customError";

export const validateAppointmentCanBeCancelled = (date: Date | string, time: string): void => {
    const parsedDate = new Date(date); 

    if (isNaN(parsedDate.getTime())) {
        throw new CustomError(400, "Fecha inválida para el turno.");
    }

    const datePart = parsedDate.toISOString().split('T')[0]; 
    const appointmentDateTime = new Date(`${datePart}T${time}`);

    const now = new Date();
    const diffInMs = appointmentDateTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
        throw new CustomError(400, "No se puede cancelar el turno con menos de 24 horas de anticipación.");
    }
};
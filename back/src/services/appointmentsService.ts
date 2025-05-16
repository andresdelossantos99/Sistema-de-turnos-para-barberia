import IAppointments from "../interfaces/IAppointments";

let appointments: IAppointments[] = []
let id: number = 1;

function createAppointmentsService(appointmentsData: IAppointments): IAppointments {
  const newAppointments: IAppointments = {
    ...appointmentsData,
    id: id++
  }; 
  appointments.push(newAppointments);
  return newAppointments;
}

function getAppointmentsService(): IAppointments[] {
  return appointments;
}       
function deleteAppointmentsService(id: number): void {
  appointments = appointments.filter((appointments: IAppointments) => {
    return appointments.id !== id;
  });
  }
export { createAppointmentsService, getAppointmentsService, deleteAppointmentsService };
export default appointments;           
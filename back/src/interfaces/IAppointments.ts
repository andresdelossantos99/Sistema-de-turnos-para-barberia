interface IAppointments{
id:number,
date:string,
time:string,
userId: number,
status:'active' | 'cancelled';
}
export default IAppointments
;
import { Request, Response } from "express";    

export const getAllAppoinments = async (req: Request, res: Response) => {
    res.status(200).send("listado de turnos");
};
export const getAppointmentsById = async (req: Request, res: Response) => {
    const { id } = req.params;
     res.status(200).send(`turno con id ${id}`);
}
export const scheduleAppointments = async (req: Request, res: Response) => {
    res.status(201).send("Turno creado");
};
export const cancelAppointments = async (req: Request, res: Response) => {
    res.status(200).send(`turno cancelado`);
};
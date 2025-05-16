import { Router } from "express";

const appointmentsRouter = Router();


appointmentsRouter.get("/appointments", (req, res) => {
  res.status(200).send("Listado de turnos");
});
appointmentsRouter.get("/appointments/:id", (req, res) => {
  const { id } = req.params;
  res.status(201).send(`Turno con id ${id}`);
});
appointmentsRouter.post("/appointments/schedule", (req, res) => {
  res.status(201).send("Turno creado");
});
appointmentsRouter.put("/appointments/cancel", (req, res) => {
  res.status(200).send(`Turno cancelado`);
});
export default appointmentsRouter;
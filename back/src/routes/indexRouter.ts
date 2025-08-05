import { Router } from "express";
import userRouter from "./userRouter";
import appointmentsRouter from "./appointmentsRouter";

const indexrouter: Router = Router();

indexrouter.use("/users", userRouter);

indexrouter.use("/appointments", appointmentsRouter);

export default indexrouter;

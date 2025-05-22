import { Router} from "express";
import userRouter from "./userRouter"
import appointmentsRouter from "./appointmentsRouter"
// import {auth} from "../middelware/auth"

;
const indexrouter: Router = Router();

indexrouter.use("/users", userRouter);

indexrouter.use("/appointments", appointmentsRouter);

export default indexrouter;
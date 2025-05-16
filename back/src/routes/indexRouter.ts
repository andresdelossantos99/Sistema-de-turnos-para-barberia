import { Router} from "express";
import userRouter from "./userRouter"
import appointmentsRouter from "./AppointmentsRouter"
// import auth from "../middelware/auth"

const indexrouter: Router = Router();

indexrouter.use("/", userRouter);

indexrouter.use("/", appointmentsRouter);

export default indexrouter;
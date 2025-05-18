import { Router, Request, Response  } from "express";
import { getAppointmentsController, getAppointmentsByIdController, cancelStatusAppointmentsController } from "../controllers/appointmentsController";
import { AppointmentsRegisterDto} from "../dto/AppointmentRegisterDto";  
import { registerAppointmentsController } from "../controllers/appointmentsController";   

const appointmentsRouter = Router();


appointmentsRouter.get("/",(req:Request, res:Response) => getAppointmentsController(req, res));
appointmentsRouter.get("/:id", (req:Request<{id: string}>, res:Response) => getAppointmentsByIdController(req,res));
appointmentsRouter.post("/schedule", (req:Request<unknown,unknown, AppointmentsRegisterDto>, res:Response) => registerAppointmentsController(req,res));
appointmentsRouter.put("/cancel/:id", (req:Request<{id: string}>, res:Response) => cancelStatusAppointmentsController(req,res));


  export default appointmentsRouter;
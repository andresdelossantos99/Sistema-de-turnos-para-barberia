import { Request, Response, Router } from "express";
import {
  getUsersController,
  getUserByIdController,
  registerUserController,
  loginUserController,
} from "../controllers/userController";
import { UserRegisterDto, UserLoginDto } from "../dto/UserDto";

const userRouter: Router = Router();

userRouter.post(
  "/register",
  (req: Request<unknown, unknown, UserRegisterDto>, res: Response) =>
    registerUserController(req, res)
);
userRouter.post(
  "/login",
  (req: Request<unknown, unknown, UserLoginDto>, res: Response) =>
    loginUserController(req, res)
);
userRouter.get("/", (req: Request, res: Response) =>
  getUsersController(req, res)
);
userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getUserByIdController(req, res)
);
export default userRouter;

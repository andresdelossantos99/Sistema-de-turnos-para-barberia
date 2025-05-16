import { Router } from "express";
// import { createUser } from "../controllers/userController";
const userRouter: Router = Router();

userRouter.get("/", (req, res) => {
  res.status(200).send("Obtener todos los usuarios");
});
userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
    res.send(`Obtener usuario con id ${id}`);
 });
userRouter.post("/register", (req, res) => {
  res.status(201).send("Usuario creado");
});
export default userRouter;
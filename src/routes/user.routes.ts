// userRoutes.ts
import { Router } from "express";
import UserService from "../services/user.service";

const user_router = Router();

user_router.get("/:id", UserService.get);
user_router.get("/users", UserService.getAll);
user_router.put("/", UserService.update);
user_router.delete("/:id", UserService.delete);

export default user_router;

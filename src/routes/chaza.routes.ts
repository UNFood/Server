// chazaRoutes.ts
import { Router } from "express";
import chaza from "../controllers/chaza.controller";
const chaza_router = Router();

//Routes
chaza_router.get("/:id", chaza.getChaza);
chaza_router.get("/chazas", chaza.getAllChazas);
chaza_router.post("/", chaza.createChaza);
chaza_router.put("/", chaza.updateChaza);
chaza_router.delete("/:id", chaza.deleteChaza);

export default chaza_router;

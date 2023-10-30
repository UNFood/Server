// chazaRoutes.ts
import { Router } from "express";
import chaza from "../controllers/chaza.controller";
import { verifyTokenChaza } from "../middlewares/verify";
import chazaService from "../services/chaza.service";

const chaza_router = Router();

// Routes
chaza_router.get("/byId/:id", chaza.getChaza);
chaza_router.get("/byName/:name", chaza.getChazaByName);
chaza_router.get("/chazas", chaza.getAllChazas);
chaza_router.post(
  "/",
  chazaService.uploadImage.single("image"),
  chaza.createChaza
);
chaza_router.put("/", verifyTokenChaza, chaza.updateChaza);
chaza_router.delete("/:id", verifyTokenChaza, chaza.deleteChaza);
chaza_router.get("/filterByLocation", chaza.filterByLocation); 

export default chaza_router;

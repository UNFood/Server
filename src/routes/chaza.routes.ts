// chazaRoutes.ts
import { Router } from "express";
import chaza from "../controllers/chaza.controller";
import product from "../controllers/product.controller";
import chazaService from "../services/chaza.service";

const chaza_router = Router();

//Routes
chaza_router.get("/:id", chaza.getChaza);
chaza_router.get("/byName/:name", chaza.getChazaByName);
chaza_router.get("/chazas", chaza.getAllChazas);
chaza_router.post(
  "/",
  chazaService.uploadImage.single("image"),
  chaza.createChaza
);
chaza_router.get("/products", product.getAllProducts);

chaza_router.put("/", chaza.updateChaza);
chaza_router.delete("/:id", chaza.deleteChaza);

export default chaza_router;

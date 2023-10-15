// chazaRoutes.ts
import { Router } from "express";
import chaza from "../controllers/chaza.controller";
import product from "../controllers/product.controller";
import chazaService from "../services/chaza.service";
import { verifyTokenChaza } from "../middlewares/verify";

const chaza_router = Router();

//Routes
chaza_router.get("/byId/:id", chaza.getChaza);
chaza_router.get("/byName/:name", chaza.getChazaByName);
chaza_router.get("/chazas", chaza.getAllChazas);
chaza_router.post(
  "/",
  chazaService.uploadImage.single("image"),
  chaza.createChaza
);
<<<<<<< HEAD
chaza_router.get("/product", product.getAllProducts);

chaza_router.put("/", chaza.updateChaza);
chaza_router.delete("/:id", chaza.deleteChaza);
=======
chaza_router.put("/", verifyTokenChaza, chaza.updateChaza);
chaza_router.delete("/:id", verifyTokenChaza, chaza.deleteChaza);
>>>>>>> develop

export default chaza_router;

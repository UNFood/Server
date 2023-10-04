import express from "express";
import * as OrderController from "../controllers/order.controller";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/getByUser", OrderController.getByUser);
router.get("/getByChaza", OrderController.getByChaza);
router.put("/", OrderController.updateOrder);
router.delete("/", OrderController.deleteOrder);

export default router;

// routes/product.routes.ts
import express from "express";
import product from "../controllers/product.controller";

const product_router = express.Router();

//Routes
product_router.get("/:id", product.getProduct);
product_router.get("/products", product.getAllProducts);
product_router.post("/", product.createProduct);
product_router.put("/", product.updateProduct);
product_router.delete("/", product.deleteProduct);
product_router.get("/products/filters", product.getProductsByFilters);

export default product_router;

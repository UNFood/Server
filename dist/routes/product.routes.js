"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/product.routes.ts
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const product_router = express_1.default.Router();
//Routes
product_router.get('/product', product_controller_1.default.getProduct);
product_router.get('/products', product_controller_1.default.getAllProducts);
product_router.post('/createProduct', product_controller_1.default.createProduct);
product_router.put('/updateProduct', product_controller_1.default.updateProduct);
product_router.delete('/deleteProduct', product_controller_1.default.deleteProduct);
exports.default = product_router;

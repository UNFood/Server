"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
const product = {
    //Route: GET /product
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield product_service_1.default.get(req.body.name);
            return res.status(200).send({
                message: "Product successfully retrieved",
                data: data,
            });
        }
        catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }),
    //Route: GET /products
    getAllProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("get");
            const data = yield product_service_1.default.getAll();
            return res.status(200).send({
                message: "Products successfully retrieved",
                data: data,
            });
        }
        catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }),
    //Route: POST /createProduct
    createProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield product_service_1.default.create(req.body);
            return res.status(200).send({
                message: "Product successfully created",
                data: { data },
            });
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }),
    //Route: PUT /updateProduct
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield product_service_1.default.update(req.body);
            return res.status(200).send({
                message: "Product successfully updated",
            });
        }
        catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }),
    //Route: DELETE /deleteProduct
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield product_service_1.default.delete(req.body.name);
            return res.status(200).send({
                message: "Product successfully deleted",
                data: data,
            });
        }
        catch (error) {
            return res.status(400).send({ message: error.message });
        }
    }),
};
exports.default = product;

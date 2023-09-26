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
const Product_1 = __importDefault(require("../models/Product"));
const productService = {
    get: function (name) {
        return __awaiter(this, void 0, void 0, function* () {
            //Consultar en la colección de productos de la base de datos
            const productDB = yield Product_1.default.findOne({ name: name }).exec();
            if (!productDB)
                throw new Error("Product not found");
            //Convertir el resultado a un objeto de tipo ProductI
            let product = {
                name: productDB.name,
                description: productDB.description,
                category: productDB.category,
                price: productDB.price,
                stock: productDB.stock,
                image: productDB.image,
                total_sales: productDB.total_sales,
            };
            //Retornar el producto
            return product;
        });
    },
    getAll: function () {
        return __awaiter(this, void 0, void 0, function* () {
            //Consultar la colección de productos de la base de datos
            const productListDB = yield Product_1.default.find().exec();
            //Convertir el resultado a un arreglo de objetos de tipo ProductI
            let products = productListDB.map((product) => ({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: product.image,
                total_sales: product.total_sales,
            }));
            //Retornar el arreglo de productos
            return products;
        });
    },
    create: function (product) {
        return __awaiter(this, void 0, void 0, function* () {
            //Crear un nuevo producto que va a ser guardado en la base de datos
            let newProduct = new Product_1.default({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: product.image,
                total_sales: product.total_sales,
            });
            if (!newProduct)
                throw new Error("Error creating product");
            //Guardar el producto en la base de datos
            let result = yield newProduct.save();
            if (!result)
                throw new Error("Error saving product");
            //Convertir el resultado a un objeto de tipo ProductI
            let data = {
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: product.image,
                total_sales: product.total_sales,
            };
            //Retornar el objeto creado
            return data;
        });
    },
    update: function (newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            //Actualizar el producto en la base de datos
            const productDB = yield Product_1.default.findOneAndUpdate({ name: newProduct.name }, newProduct).exec();
            if (!productDB)
                throw new Error("Error updating product");
            //Convertir el resultado a un objeto de tipo ProductI
            let updateProduct = {
                name: productDB.name,
                description: productDB.description,
                category: productDB.category,
                price: productDB.price,
                stock: productDB.stock,
                image: productDB.image,
                total_sales: productDB.total_sales,
            };
            //Retornar el objeto actualizado
            return updateProduct;
        });
    },
    delete: function (name) {
        return __awaiter(this, void 0, void 0, function* () {
            //Eliminar el producto de la base de datos
            const productDB = yield Product_1.default.findOneAndDelete({ name: name }).exec();
            if (!productDB)
                throw new Error("Error deleting product");
            //Convertir el resultado a un objeto de tipo ProductI
            let deleteProduct = {
                name: productDB.name,
                description: productDB.description,
                category: productDB.category,
                price: productDB.price,
                stock: productDB.stock,
                image: productDB.image,
                total_sales: productDB.total_sales,
            };
            //Retornar el objeto eliminado
            return deleteProduct;
        });
    },
};
exports.default = productService;

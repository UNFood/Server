"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = __importDefault(require("./product.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const chaza_routes_1 = __importDefault(require("./chaza.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const router_manager = (0, express_1.Router)();
//Add routes to api
router_manager.use("/v1/auth", auth_routes_1.default);
router_manager.use("/v1/product", product_routes_1.default);
router_manager.use("/v1/user", user_routes_1.default);
router_manager.use("/v1/chaza", chaza_routes_1.default);
exports.default = router_manager;

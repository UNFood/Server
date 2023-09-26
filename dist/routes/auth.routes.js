"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_router = express_1.default.Router();
auth_router.post("/signup", auth_controller_1.default.signup);
auth_router.post("/login", auth_controller_1.default.login);
exports.default = auth_router;

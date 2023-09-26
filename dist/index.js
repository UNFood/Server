"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
require("./config/database");
const PORT = (_a = process.env.SERVER_PORT) !== null && _a !== void 0 ? _a : 3000;
app_1.default.listen(PORT);
console.log("sever listen on port", PORT);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("express");
const manager_routes_1 = __importDefault(require("../routes/manager.routes"));
// import routes...
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("api version 1 en desarrollo ...");
});
// routes
app.use("/api", manager_routes_1.default);
exports.default = app;

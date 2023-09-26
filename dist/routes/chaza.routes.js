"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// chazaRoutes.ts
const express_1 = require("express");
const chaza_controller_1 = require("../controllers/chaza.controller");
const chaza_router = (0, express_1.Router)();
chaza_router.post('/', chaza_controller_1.createChaza);
chaza_router.get('/:id', chaza_controller_1.getChazaById);
chaza_router.delete('/:id', chaza_controller_1.deleteChaza);
chaza_router.get('/', chaza_controller_1.getAllChazas);
chaza_router.patch('/:id', chaza_controller_1.updateChaza);
exports.default = chaza_router;

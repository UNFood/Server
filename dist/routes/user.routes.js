"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// userRoutes.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_router = (0, express_1.Router)();
user_router.post('/', user_controller_1.createUser);
user_router.get('/:id', user_controller_1.getUser);
user_router.delete('/:id', user_controller_1.deleteUser);
user_router.get('/', user_controller_1.getAllUsers);
user_router.patch('/:id', user_controller_1.updateUser);
exports.default = user_router;

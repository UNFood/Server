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
const User_1 = __importDefault(require("../models/User"));
class UserService {
    // Crear un nuevo usuario
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new User_1.default(userData);
                const savedUser = yield user.save();
                return savedUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Obtener un usuario por su ID
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(userId);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Obtener todos los usuarios
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Actualizar un usuario por su ID
    updateUserById(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findByIdAndUpdate(userId, userData, { new: true });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Eliminar un usuario por su ID
    deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.findByIdAndDelete(userId);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new UserService();

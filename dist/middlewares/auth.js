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
exports.validateLogin = exports.validateRegister = exports.comparePassword = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(16);
        const hash = yield bcrypt_1.default.hash(password, salt);
        return hash;
    }
    catch (error) {
        throw new Error(`Failed to encrypt password ${password}`);
    }
});
exports.encryptPassword = encryptPassword;
const comparePassword = (password, receivedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(password, receivedPassword);
    return result;
});
exports.comparePassword = comparePassword;
const validateRegister = (user) => {
    if (Object.values(user).some((field) => field === undefined ||
        field === null ||
        (typeof field === "string" && field.length === 0))) {
        return false;
    }
    return true;
};
exports.validateRegister = validateRegister;
const validateLogin = (user) => {
    if (Object.values(user).some((field) => field === undefined ||
        field === null ||
        (typeof field === "string" && field.length === 0))) {
        return false;
    }
    return true;
};
exports.validateLogin = validateLogin;

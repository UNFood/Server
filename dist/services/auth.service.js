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
const auth_1 = require("../middlewares/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../config/secret");
const authServices = {
    signup: (user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, auth_1.validateRegister)(user))
            throw new Error("Invalid user");
        const userExist = yield User_1.default.findOne({ username: user.username });
        if (userExist)
            throw new Error("User already exists");
        const newUser = new User_1.default({
            username: user.username,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            password: yield (0, auth_1.encryptPassword)(user.password),
            phone: "",
            address: "",
        });
        const token = jsonwebtoken_1.default.sign({ username: newUser.username, id: newUser._id }, secret_1.secret, { expiresIn: "2h" });
        console.log(token);
        const result = yield newUser.save();
        if (!result)
            throw new Error("Error saving user");
        return token;
    }),
    login: (user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, auth_1.validateLogin)(user))
            throw new Error("Invalid user or password");
        const userExist = yield User_1.default.findOne({ username: user.username });
        if (!userExist)
            throw new Error("User not found");
        const validPassword = yield (0, auth_1.comparePassword)(user.password, userExist.password);
        if (!validPassword)
            throw new Error("Invalid password");
        const token = jsonwebtoken_1.default.sign({ username: userExist.username, id: userExist._id }, secret_1.secret, { expiresIn: "2h" });
        return token;
    }),
    handleGoogleUser: (googleId, email) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if user exists in your database
        let user = yield User_1.default.findOne({ googleId });
        if (!user) {
            // If user doesn't exist, create a new user
            user = new User_1.default({
                googleId,
                email,
                // any other fields you want to populate
            });
            yield user.save();
        }
        else {
            // Update user if needed
            // For example, you might want to update the email if it has changed on the Google side
            if (user.email !== email) {
                user.email = email;
                yield user.save();
            }
        }
        // Return user data or token or whatever you need
        return user;
    })
};
exports.default = authServices;

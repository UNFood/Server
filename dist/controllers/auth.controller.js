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
const google_auth_library_1 = require("google-auth-library");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const CLIENT_ID = "714119740864-86bb52urngugkd0t6iorv6cq5rv5ecvm.apps.googleusercontent.com"; // Replace with your Google Client ID
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
const auth = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield auth_service_1.default.signup(req.body);
            return res.status(200).json({ message: "User created successfully", data });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield auth_service_1.default.login(req.body);
            return res.status(200).json({ message: "User login successfully", data });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token } = req.body;
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const googleId = payload === null || payload === void 0 ? void 0 : payload.sub;
            const email = payload === null || payload === void 0 ? void 0 : payload.email;
            if (!googleId || !email) {
                return res.status(400).json({ message: "Invalid Google token" });
            }
            const userData = yield auth_service_1.default.handleGoogleUser(googleId, email); // <-- Pass both googleId and email
            return res.status(200).json({ message: "User authenticated with Google", data: userData });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }),
};
exports.default = auth;

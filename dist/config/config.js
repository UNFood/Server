"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_HOST = process.env.MONGO_HOST || "";
const SERVER_PORT = (_a = process.env.SERVER_PORT) !== null && _a !== void 0 ? _a : 3000;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
exports.config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};

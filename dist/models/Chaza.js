"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chazaSchema = new mongoose_1.default.Schema({
    owner: {
        ref: "User",
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    products: [
        {
            ref: "Product",
            type: mongoose_1.default.Schema.Types.ObjectId,
        },
    ],
    score: {
        type: Number,
        default: -1,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Chaza = mongoose_1.default.model("Chaza", chazaSchema);
exports.default = Chaza;

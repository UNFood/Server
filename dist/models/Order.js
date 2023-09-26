"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        ref: "User",
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    chaza: {
        ref: "Chaza",
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    products: [
        {
            product: {
                ref: "Product",
                type: mongoose_1.default.Schema.Types.ObjectId,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    success: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;

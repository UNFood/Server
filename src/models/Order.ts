import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    chaza: {
      ref: "Chaza",
      type: mongoose.Schema.Types.ObjectId,
    },
    products: [
      {
        product: {
          ref: "Product",
          type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

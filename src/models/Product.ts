import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
    },
    chaza: {
      ref: "Chaza",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

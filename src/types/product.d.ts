import mongoose from "mongoose";

export interface ProductI {
  _id: mongoose.Types.ObjectId;
  name: String;
  description: String;
  price: Number;
  image: String;
  category: Number;
  stock: Number | undefined;
  total_sales: Number;
}

export interface ProductCreateI {
  _id: mongoose.Types.ObjectId;
  chaza_id: mongoose.Types.ObjectId;
  name: String;
  description: String;
  price: Number;
  image: String;
  category: Number;
  stock: Number | undefined;
  total_sales: Number;
}
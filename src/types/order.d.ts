import mongoose from "mongoose";

interface productsOrder {
  product: mongoose.Types.ObjectId | undefined;
  quantity: Number;
}

export interface orderI {
  _id: mongoose.Types.ObjectId | undefined;
  user: mongoose.Types.ObjectId | undefined;
  chaza: mongoose.Types.ObjectId | undefined;
  products: Array<productsOrder>;
  state: String;
  time_to_delivery: Date | undefined;
  total: Number;
}

export interface orderCreateI {
  user: mongoose.Types.ObjectId | undefined;
  chaza: mongoose.Types.ObjectId | undefined;
  products: Array<productsOrder>;
  state: String;
  time_to_delivery: Date | undefined;
  total: Number;
}

export interface orderUpdateI {
  _id: mongoose.Types.ObjectId | undefined;
  user: mongoose.Types.ObjectId | undefined;
  chaza: mongoose.Types.ObjectId | undefined;
  products: Array<productsOrder>;
  state: String;
  time_to_delivery: Date | undefined;
  total: Number;
}

import mongoose, { StringExpressionOperatorReturningBoolean } from "mongoose";

export interface ChazaI {
  _id: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId | undefined;
  name: String;
  description: String;
  type: Number;
  address: String;
  phone: String;
  products: mongoose.Types.ObjectId[];
  score: Number;
  image: String | undefined;
  payment_method: Number[];
}

export interface ChazaCreateI {
  owner: mongoose.Types.ObjectId | undefined;
  name: String;
  description: String;
  type: Number;
  address: String;
  phone: String;
  products: mongoose.Types.ObjectId[];
  score: Number;
  image: String;
  payment_method: Number[];
}

export interface ChazaUpdateI {
  _id: mongoose.Types.ObjectId;
  name: String;
  description: String;
  type: Number;
  address: String;
  phone: String;
  score: Number;
  image: String;
  payment_method: Number[];
}

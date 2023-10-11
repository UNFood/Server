import mongoose, { StringExpressionOperatorReturningBoolean } from "mongoose";

export interface Location {
  latitude: number;
  longitude: number;
}

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
  location: Location;
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
  location: Location;
}

export interface ChazaUpdateI {
  owner: mongoose.Types.ObjectId;
  description: String;
  address: String;
  type: Number;
  phone: String;
  payment_method: Number[];
  location: Location;
}

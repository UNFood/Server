import Document from "mongoose";

export interface ProductI {
  name: String;
  description: String;
  price: Number;
  image: String;
  category: Number;
  stock: Number | undefined;
  total_sales: Number;
}

export interface ProductCreateI {
  chaza_name: String;
  name: String;
  description: String;
  price: Number;
  image: String;
  category: Number;
  stock: Number | undefined;
}
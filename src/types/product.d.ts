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

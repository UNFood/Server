import Document from 'mongoose';

export interface ProductI{
    name: String;
    description: String;
    price: Number;
    category: Number | undefined;
    stock: undefined | Number;
}
  
import multer from "multer";
import multerS3 from "multer-s3";
import Chaza from "../models/Chaza";
import { s3Config } from "../config/s3";
import { ChazaI, ChazaCreateI, ChazaUpdateI, ChazaReadI } from "../types/chaza";
import productService from "./product.service";
import { ProductI } from "../types/product";
import { orderI } from "../types/order";
import Product from "../models/Product";
import Order from "../models/Order";
import product from "../controllers/product.controller";

const chazaService = {
  get: async function (_id: String): Promise<ChazaReadI | null> {
    //Consultar en la colección de chazas de la base de datos
    const chazaDB = await Chaza.findOne({ owner: _id }).exec();
    if (!chazaDB) return null;
    const products = await productService.getProductsList(
      chazaDB.products.map((product) => product._id.toString())
    );

    //Convertir el resultado a un objeto de tipo ChazaI
    let chaza: ChazaReadI = {
      _id: chazaDB._id,
      owner: chazaDB.owner,
      name: chazaDB.name,
      description: chazaDB.description,
      type: chazaDB.type,
      address: chazaDB.address,
      phone: chazaDB.phone,
      products: products,
      score: chazaDB.score,
      image: chazaDB.image,
      payment_method: chazaDB.payment_method,
    };
    //Retornar la chaza
    return chaza;
  },
  getByName: async function (name: String): Promise<ChazaReadI | null> {
    //Consultar en la colección de chazas de la base de datos
    const chazaDB = await Chaza.findOne({ name: name }).exec();
    if (!chazaDB) return null;
    const products = await productService.getProductsList(
      chazaDB.products.map((product) => product._id.toString())
    );

    //Convertir el resultado a un objeto de tipo ChazaI
    let chaza: ChazaReadI = {
      _id: chazaDB._id,
      owner: chazaDB.owner,
      name: chazaDB.name,
      description: chazaDB.description,
      type: chazaDB.type,
      address: chazaDB.address,
      phone: chazaDB.phone,
      products: products,
      score: chazaDB.score,
      image: chazaDB.image,
      payment_method: chazaDB.payment_method,
    };
    //Retornar la chaza
    return chaza;
  },
  getAll: async function (): Promise<ChazaI[]> {
    //Consultar la colección de chazas de la base de datos
    const chazaListDB = await Chaza.find().exec();
    //Convertir el resultado a un arreglo de objetos de tipo ChazaI
    let chazas = chazaListDB.map((chaza) => ({
      _id: chaza._id,
      owner: chaza.owner,
      name: chaza.name,
      description: chaza.description,
      type: chaza.type,
      address: chaza.address,
      phone: chaza.phone,
      products: chaza.products,
      score: chaza.score,
      image: chaza.image,
      payment_method: chaza.payment_method,
    }));
    //Retornar el arreglo de chazas
    return chazas;
  },
  getAllOrders: async function (chaza: String): Promise<orderI[]> {
    //Consultar la colección de chazas de la base de datos
    const orderListDB = await Order.find({ chaza: chaza }).exec();
    //Convertir el resultado a un arreglo de objetos de tipo ChazaI
    let orders = orderListDB.map((order) => ({
      _id: order._id,
      user: order.user,
      chaza: order.chaza,
      products: order.products,
      state: order.state,
      time_to_delivery: order.time_to_delivery,
      total: order.total,
    }));
    //Retornar el arreglo de productos
    return orders;
  },
  getAllProducts: async function (chaza: String): Promise<ProductI[]> {
    //Consultar la colección de chazas de la base de datos
    const productListDB = await Product.find({ name_chaza: chaza }).exec();
    //Convertir el resultado a un arreglo de objetos de tipo ChazaI
    let products = productListDB.map((product) => ({
      _id: product._id,
      name: product.name,
      name_chaza: product.name_chaza,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      total_sales: product.total_sales,
    }));
    //Retornar el arreglo de productos
    return products;
  },
  create: async function (chaza: ChazaCreateI, image: string): Promise<ChazaI> {
    const chazaExist = await this.getByName(chaza.name);
    if (chazaExist) throw new Error("Chaza already exist");
    //Crear una nueva chaza que va a ser guardado en la base de datos
    let newChaza = new Chaza({
      owner: chaza.owner,
      name: chaza.name,
      description: chaza.description,
      type: chaza.type,
      address: chaza.address,
      phone: chaza.phone,
      products: chaza.products,
      score: chaza.score,
      image: image,
      payment_method: chaza.payment_method,
    });
    if (!newChaza) throw new Error("Error creating chaza");
    //Guardar la chaza en la base de datos
    let result = await newChaza.save();
    if (!result) throw new Error("Error saving chaza");
    //Convertir el resultado a un objeto de tipo ChazaI
    let data: ChazaI = {
      _id: result._id,
      owner: result.owner,
      name: result.name,
      description: result.description,
      type: result.type,
      address: result.address,
      phone: result.phone,
      products: result.products,
      score: result.score,
      image: result.image,
      payment_method: result.payment_method,
    };
    //Retornar la chaza creada
    return data;
  },
  update: async function (newChaza: ChazaUpdateI): Promise<void> {
    //Actualizar la chaza en la base de datos no retorna nada pues
    //findOneAndUpdate no retorna el objeto actualizado sino el objeto antes de actualizar
    console.log(newChaza);
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: newChaza.owner },
      newChaza
    ).exec();
    if (!chazaDB) throw new Error("Error updating chaza");
  },
  delete: async function (_id: String): Promise<ChazaI> {
    //Eliminar la chaza de la base de datos
    const chazaDB = await Chaza.findOneAndDelete({ owner: _id }).exec();
    if (!chazaDB) throw new Error("Error deleting chaza");
    //Convertir el resultado a un objeto de tipo ChazaI
    let deleteChaza: ChazaI = {
      _id: chazaDB._id,
      owner: chazaDB.owner,
      name: chazaDB.name,
      description: chazaDB.description,
      type: chazaDB.type,
      address: chazaDB.address,
      phone: chazaDB.phone,
      products: chazaDB.products,
      score: chazaDB.score,
      image: chazaDB.image,
      payment_method: chazaDB.payment_method,
    };
    //Retornar el objeto eliminado
    return deleteChaza;
  },
  addProduct: async function (
    chaza_id: String | undefined,
    product_id: String
  ) {
    //Agregar el producto a la chaza
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: chaza_id },
      { $push: { products: product_id } }
    ).exec();
    if (!chazaDB) throw new Error("Error adding product to chaza");
  },
  deleteProduct: async function (chaza_id: String, product_id: String) {
    //Eliminar el producto de la chaza
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: chaza_id },
      { $pull: { products: product_id } }
    ).exec();
    if (!chazaDB) throw new Error("Error deleting product from chaza");
  },
  uploadImage: multer({
    storage: multerS3({
      s3: s3Config,
      bucket: "unfood",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
    }),
  }),
};

export default chazaService;

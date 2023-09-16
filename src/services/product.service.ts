import Product from "../models/Product";
import { ProductI } from "../types/product";

const productService = {
  getAll: async function (): Promise<ProductI[]> {
    //Consultar la colección de productos de la base de datos
    const productList = await Product.find();
    //Convertir el resultado a un arreglo de objetos de tipo ProductI
    let products = productList.map((product) => ({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
    }));
    //Retornar el arreglo de productos
    return products;
  },
  create: async function (product: ProductI): Promise<ProductI> {
    //Crear un nuevo producto que va a ser guardado en la base de datos
    let newProduct = new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    if (!newProduct) throw new Error("Error creating product");
    //Guardar el producto en la base de datos
    let result = await newProduct.save();
    if (!result) throw new Error("Error saving product");
    //Convertir el resultado a un objeto de tipo ProductI
    let data: ProductI = {
      name: result.name,
      description: result.description,
      category: result.category,
      price: result.price,
      stock: result.stock,
    };
    //Retornar el objeto creado
    return data;
  },
};

export default productService;

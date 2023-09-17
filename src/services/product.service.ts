import Product from "../models/Product";
import { ProductI } from "../types/product";

const productService = {
  get: async function (name: string): Promise<ProductI> {
    //Consultar en la colección de productos de la base de datos
    const productDB=await Product.findOne({name:name}).exec();
    if (!productDB) throw new Error("Product not found");
    //Convertir el resultado a un objeto de tipo ProductI
    let product: ProductI = {
      name: productDB.name,
      description: productDB.description,
      category: productDB.category,
      price: productDB.price,
      stock: productDB.stock,
    };
    //Retornar el producto
    return product;
    
  },
  getAll: async function (): Promise<ProductI[]> {
    //Consultar la colección de productos de la base de datos
    const productListDB = await Product.find().exec();
    //Convertir el resultado a un arreglo de objetos de tipo ProductI
    let products =productListDB.map((product) => ({
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
      category: product.category,
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
      price: result.price,
      category: result.category,
      stock: result.stock,
    };
    //Retornar el objeto creado
    return data;
  },
  update: async function (newProduct: ProductI): Promise<ProductI> {
    //Actualizar el producto en la base de datos
    const productDB= await Product.findOneAndUpdate({name:newProduct.name},newProduct).exec();
    if (!productDB) throw new Error("Error updating product");
    //Convertir el resultado a un objeto de tipo ProductI
    let updateProduct: ProductI = {
      name: productDB.name,
      description: productDB.description,
      category: productDB.category,
      price: productDB.price,
      stock: productDB.stock,
    };
    //Retornar el objeto actualizado
    return updateProduct;
  },
  delete: async function (name: string): Promise<ProductI> {
    //Eliminar el producto de la base de datos
    const productDB= await Product.findOneAndDelete({name:name}).exec();
    if (!productDB) throw new Error("Error deleting product");
    //Convertir el resultado a un objeto de tipo ProductI
    let deleteProduct: ProductI = {
      name: productDB.name,
      description: productDB.description,
      category: productDB.category,
      price: productDB.price,
      stock: productDB.stock,
    };
    //Retornar el objeto eliminado
    return deleteProduct;
  },
};

export default productService;

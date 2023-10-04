import Chaza from "../models/Chaza";
import { ChazaI, ChazaCreateI, ChazaUpdateI } from "../types/chaza";

const chazaService = {
  get: async function (_id: String): Promise<ChazaI> {
    //Consultar en la colección de chazas de la base de datos
    const chazaDB = await Chaza.findOne({ owner: _id }).exec();
    if (!chazaDB) throw new Error("Chaza not found");
    //Convertir el resultado a un objeto de tipo ChazaI
    let chaza: ChazaI = {
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
  create: async function (chaza: ChazaCreateI): Promise<ChazaI> {
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
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: newChaza._id },
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
};

export default chazaService;

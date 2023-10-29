import Order from "../models/Order";
import Chaza from "../models/Chaza";
import { orderI, orderCreateI, orderUpdateI, orderReadI } from "../types/order";
import productService from "./product.service";

const orderService = {
  getByChaza: async function (chaza_id: String): Promise<orderReadI[]> {
    const orderDB = await Order.find({ chaza: chaza_id }).exec();
    if (!orderDB) throw new Error("Orders not found");

    let orders = await Promise.all(
      orderDB.map(async (order) => {
        let products = await productService.getProductsList(
          order.products.map((product) => product.product.toString())
        );

        const dataProducts = products.map((product, index) => ({
          product: product,
          quantity: order.products[index].quantity,
        }));

        let data: orderReadI = {
          _id: order._id,
          user: order.user,
          chaza: order.chaza,
          products: dataProducts,
          state: order.state,
          time_to_delivery: order.time_to_delivery,
          total: order.total,
          createdAt: order.createdAt,
        };
        return data;
      })
    );
    return orders;
  },
  getByUser: async function (id_user: String): Promise<orderReadI[]> {
    const orderDB = await Order.find({ user: id_user }).exec();
    if (!orderDB) throw new Error("Orders not found");
    let orders = await Promise.all(
      orderDB.map(async (order) => {
        let products = await productService.getProductsList(
          order.products.map((product) => product.product.toString())
        );

        const dataProducts = products.map((product, index) => ({
          product: product,
          quantity: order.products[index].quantity,
        }));

        let data: orderReadI = {
          _id: order._id,
          user: order.user,
          chaza: order.chaza,
          products: dataProducts,
          state: order.state,
          time_to_delivery: order.time_to_delivery,
          total: order.total,
          createdAt: order.createdAt,
        };
        return data;
      })
    );
    return orders;
  },
  create: async function (order: orderCreateI): Promise<orderI> {
    const chaza = await Chaza.findOne({ name: order.chaza }).exec();
    if (!chaza) throw new Error("Chaza not found");

    let newOrder = new Order({
      user: order.user,
      chaza: chaza.name,
      products: order.products,
      time_to_delivery: order.time_to_delivery,
      total: order.total,
    });
    if (!newOrder) throw new Error("Error creating order");
    let result = await newOrder.save();
    if (!result) throw new Error("Error saving order");
    let data: orderI = {
      _id: result._id,
      user: result.user,
      chaza: result.chaza,
      products: result.products,
      state: result.state,
      time_to_delivery: result.time_to_delivery,
      total: result.total,
    };
    return data;
  },
  update: async function (newOrder: orderUpdateI): Promise<void> {
    const orderBD = await Order.findOneAndUpdate(
      { _id: newOrder._id },
      newOrder
    ).exec();
    if (!orderBD) throw new Error("Error updating order");
  },
  delete: async function (_id: String): Promise<orderI> {
    const orderBD = await Order.findOneAndDelete({ _id: _id }).exec();
    if (!orderBD) throw new Error("Error deleting order");
    let data: orderI = {
      _id: orderBD._id,
      user: orderBD.user,
      chaza: orderBD.chaza,
      products: orderBD.products,
      state: orderBD.state,
      time_to_delivery: orderBD.time_to_delivery,
      total: orderBD.total,
    };
    return data;
  },
  addProduct: async function (
    chaza_id: String,
    product_id: String
  ): Promise<void> {
    const orderBD = await Order.findOneAndUpdate(
      { _id: chaza_id },
      { $push: { products: product_id } }
    ).exec();
    if (!orderBD) throw new Error("Error adding product to order");
  },
  deleteProduct: async function (
    chaza_id: String,
    product_id: String
  ): Promise<void> {
    const orderBD = await Order.findOneAndUpdate(
      { _id: chaza_id },
      { $pull: { products: product_id } }
    ).exec();
    if (!orderBD) throw new Error("Error deleting product from order");
  },
};

export default orderService;

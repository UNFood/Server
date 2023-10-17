import Order from "../models/Order";
import { orderI, orderCreateI, orderUpdateI } from "../types/order";

const orderService = {
  getByChaza: async function (id_chaza: String): Promise<orderI[]> {
    const orderDB = await Order.find({ chaza: id_chaza }).exec();
    if (!orderDB) throw new Error("Orders not found");
    let orders = orderDB.map((order) => ({
      _id: order._id,
      user: order.user,
      chaza: order.chaza,
      products: order.products,
      state: order.state,
      time_to_delivery: order.time_to_delivery,
      total: order.total,
    }));
    return orders;
  },
  getByUser: async function (id_user: String): Promise<orderI[]> {
    const orderDB = await Order.find({ user: id_user }).exec();
    if (!orderDB) throw new Error("Orders not found");
    let orders = orderDB.map((order) => ({
      _id: order._id,
      user: order.user,
      chaza: order.chaza,
      products: order.products,
      state: order.state,
      time_to_delivery: order.time_to_delivery,
      total: order.total,
    }));
    return orders;
  },
  create: async function (order: orderCreateI): Promise<orderI> {
    let newOrder = new Order({
      user: order.user,
      chaza: order.chaza,
      products: order.products,
      state: order.state,
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

import { Request, Response } from 'express';
import Order from '../models/Order';

// Create a new Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ message: (error as any).message });
  }
};

// Get all Orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: (error as any).message });
  }
};

// Get a single Order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: (error as any).message });
  }
};

// Update an Order by ID
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(400).send({ message: (error as any).message });
  }
};

// Delete an Order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: (error as any).message });
  }
};

import { Request, Response } from 'express';
import Cart from '../models/Cart';

// Function to get the cart for a user
export const getCart = async (req: Request, res: Response) => {
  // Your logic to get the cart will go here
};

// Function to add an item to the cart
export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  // Find cart for the user
  let cart = await Cart.findOne({ userId });

  // Create new cart if not exists
  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity: 1 }],
    });
  } else {
    // Check if product exists in cart
    const itemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (itemIndex > -1) {
      // Update quantity of product in cart
      cart.items[itemIndex].quantity += 1;
    } else {
      // Add new product to cart
      cart.items.push({ productId, quantity: 1 });
    }
  }

  await cart.save();
  return res.status(201).send(cart);
};

// Function to remove an item from the cart
export const removeItemFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  // Find cart for the user
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).send("Cart not found");
  }

  // Find the index of the product in the cart
  const itemIndex = cart.items.findIndex((item) => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).send("Product not found in cart");
  }

  // Remove the product from the cart
  cart.items.splice(itemIndex, 1);

  await cart.save();
  return res.status(200).send(cart);
};

// Function to update the quantity of an item in the cart
export const updateItemQuantity = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  // Find cart for the user
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).send("Cart not found");
  }

  // Find the index of the product in the cart
  const itemIndex = cart.items.findIndex((item) => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).send("Product not found in cart");
  }

  // Update the quantity of the product in the cart
  cart.items[itemIndex].quantity = quantity;

  await cart.save();
  return res.status(200).send(cart);
};

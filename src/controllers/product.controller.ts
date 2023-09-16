// controllers/product.controller.ts
import { Request, Response } from "express";
import productService from "../services/product.service";

const product = {
  //Route: GET /products
  getAllProducts: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await productService.getAll();
      return res.status(200).send({
        message: "Products successfully retrieved",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
  //Route: POST /createProduct
  createProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await productService.create(req.body);
      return res.status(200).send({
        message: "Product successfully created",
        data: { data },
      });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  },
  //Route: PUT /updateProduct
  updateProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = null;
      return res.status(200).send({
        message: "Product successfully retrieved",
        data: response,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
  //Route: DELETE /deleteProduct
  deleteProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = null;
      return res.status(200).send({
        message: "Product successfully deleted",
        data: response,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
};

export default product;

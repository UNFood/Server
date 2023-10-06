// controllers/product.controller.ts
import { Request, Response, query } from "express";
import productService from "../services/product.service";
import { parse } from "dotenv";

const product = {
  //Route: GET /product
  getProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await productService.get(req.params.id);
      return res.status(200).send({
        message: "Product successfully retrieved",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
  //Route: GET /products
  getAllProducts: async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("get");
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
      const data = await productService.update(req.body);
      return res.status(200).send({
        message: "Product successfully updated",
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
  //Route: DELETE /deleteProduct
  deleteProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await productService.delete(req.body.chaza_id, req.body._id);
      return res.status(200).send({
        message: "Product successfully deleted",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },

  //ROUTE: GET /products/filters
  getProductsByFilters: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      console.log(req.query);
      req.query.priceOrder =
        req.query.priceOrder === undefined ? "1" : req.query.priceOrder;
      req.query.priceRange =
        req.query.priceRange === undefined ? "0,1000000" : req.query.priceRange;
      req.query.category =
        req.query.category === undefined ? "1,2,3,4,5,6,7" : req.query.category;

      console.log(
        typeof req.query.priceOrder,
        typeof req.query.priceRange,
        typeof req.query.category
      );

      const priceOrder: Number = parseInt(req.query.priceOrder.toString());
      console.log(req.query.priceRange.toString().split(","));
      const priceRange: Number[] | null = req.query.priceRange
        .toString()
        .split(",")
        .map(Number);
      const category: Number[] | null = req.query.category
        .toString()
        .split(",")
        .map(Number);
      const data = await productService.getByFilters(
        priceOrder,
        priceRange,
        category
      );
      return res.status(200).send({
        message: "Products successfully filtered",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
};

export default product;

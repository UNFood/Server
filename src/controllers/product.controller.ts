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
      console.log(req.query);
      let reqpriceOrder = req.query.priceOrder ?? "-1";
      let reqpriceRange = req.query.priceRange ?? "-1";
      let reqcategory = req.query.categories ?? "-1";

      if(reqpriceRange === "-1") reqpriceRange = "0,1000000";
      let data;
      console.log( reqpriceOrder, "-1",req.query.priceOrder, reqcategory === "-1" );
      console.log( reqpriceRange, "1,1000000",req.query.priceRange, reqpriceRange === "0,1000000");
      console.log( reqcategory, "-1",req.query.categories,reqpriceOrder === "-1");

      if (
        reqcategory === "-1" &&
        reqpriceOrder === "-1" &&
        reqpriceRange === "0,1000000"
      ) {
        console.log("entro");
        data = await productService.getAll();
        return res.status(200).send({
          message: "Products successfully retrieved",
          data: data,
        });
      }
      console.log("no entro");
      const priceOrder: Number = parseInt(reqpriceOrder.toString());
      const priceRange: Number[] | null = reqpriceRange
        .toString()
        .split(",")
        .map(Number);
      const category: Number[] | null = reqcategory
        .toString()
        .split(",")
        .map(Number);
      data = await productService.getByFilters(
        priceOrder,
        priceRange,
        category
      );
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
      if (req.file === undefined)
        return res.status(400).send({ message: "No file uploaded" });

      const data = await productService.create(
        req.body,
        (req.file as Express.MulterS3.File).location
      );
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
};

export default product;

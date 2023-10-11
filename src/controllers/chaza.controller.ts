import { Request, Response } from "express";
import chazaService from "../services/chaza.service";

const chaza = {
  //Route: GET /chaza
  getChaza: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await chazaService.get(req.params.id);
      if (!data) return res.status(200).send({ message: "Chaza not found" });
      return res.status(200).send({
        message: "Chaza successfully retrieved",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
  //Route: GET /chazas
  getAllChazas: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await chazaService.getAll();
      return res.status(200).send({
        message: "Chaza successfully retrieved",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
  //Route: POST /createChaza
  createChaza: async (req: Request, res: Response): Promise<Response> => {
    try {
      //console.log(req.file);
      if (req.file === undefined)
        return res.status(400).send({ message: "No file uploaded" });

      //chaza.uploadImage(req, res);
      const data = await chazaService.create(
        req.body,
        (req.file as Express.MulterS3.File).location
      );
      //console.log(data);
      return res.status(200).send({
        message: "Chaza successfully created",
        data: { data },
      });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  },
  //Route: PUT /updateChaza
  updateChaza: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await chazaService.update(req.body);
      return res.status(200).send({
        message: "Chaza successfully updated",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
  //Route: DELETE /deleteChaza
  deleteChaza: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await chazaService.delete(req.params.id);
      return res.status(200).send({
        message: "Chaza successfully deleted",
        data: data,
      });
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  },
};

export default chaza;

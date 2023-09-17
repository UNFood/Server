// chazaService.ts

import Chaza from '../models/Chaza'; // Importa el modelo de Chaza
import { Request, Response } from 'express';

class ChazaService {
  // Crea una nueva chaza
  async crearChaza(req: Request, res: Response) {
    try {
      const nuevaChaza = new Chaza(req.body);
      await nuevaChaza.save();
      res.status(201).json(nuevaChaza);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  // Obtiene todas las chazas
  async obtenerChazas(req: Request, res: Response) {
    try {
      const chazas = await Chaza.find();
      res.status(200).json(chazas);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  // Obtiene una chaza por su ID
  async obtenerChazaPorId(req: Request, res: Response) {
    try {
      const chaza = await Chaza.findById(req.params.id);
      if (!chaza) {
        return res.status(404).json({ message: 'Chaza no encontrada' });
      }
      res.status(200).json(chaza);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  // Actualiza una chaza por su ID
  async actualizarChaza(req: Request, res: Response) {
    try {
      const chaza = await Chaza.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!chaza) {
        return res.status(404).json({ message: 'Chaza no encontrada' });
      }
      res.status(200).json(chaza);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }

  // Elimina una chaza por su ID
  async eliminarChaza(req: Request, res: Response) {
    try {
      const chaza = await Chaza.findByIdAndDelete(req.params.id);
      if (!chaza) {
        return res.status(404).json({ message: 'Chaza no encontrada' });
      }
      res.status(200).json({ message: 'Chaza eliminada exitosamente' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }
}

export default ChazaService;

import Chaza from '../models/Chaza';
import { Request, Response } from 'express';

// Create a new Chaza
export const createChaza = async (req: Request, res: Response) => {
    try {
        const chaza = new Chaza(req.body);
        await chaza.save();
        res.status(201).send(chaza);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Chazas
export const getAllChazas = async (req: Request, res: Response)=> {
    try {
        const chazas = await Chaza.find();
        res.send(chazas);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Chaza by ID
export const getChazaById = async (req: Request, res: Response)=> {
    try {
        const chaza = await Chaza.findById(req.params.id).populate('products');
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send(chaza);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Chaza by ID
export const updateChaza = async (req: Request, res: Response) => {
    try {
        const chaza = await Chaza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send(chaza);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Chaza by ID
export const deleteChaza = async (req: Request, res: Response)  => {
    try {
        const chaza = await Chaza.findByIdAndDelete(req.params.id);
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send({ message: 'Chaza deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

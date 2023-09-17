// userController.ts

import User from '../models/User';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response)  => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req: Request, res: Response)  => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response)  => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find(); // Esto obtiene todos los usuarios
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async  (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

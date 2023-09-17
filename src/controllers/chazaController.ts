import Chaza from '../models/Chaza';

// Create a new Chaza
export const createChaza = async (req, res) => {
    try {
        const chaza = new Chaza(req.body);
        await chaza.save();
        res.status(201).send(chaza);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Get all Chazas
export const getAllChazas = async (req, res) => {
    try {
        const chazas = await Chaza.find();
        res.send(chazas);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Get a single Chaza by ID
export const getChazaById = async (req, res) => {
    try {
        const chaza = await Chaza.findById(req.params.id).populate('products');
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send(chaza);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update a Chaza by ID
export const updateChaza = async (req, res) => {
    try {
        const chaza = await Chaza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send(chaza);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Delete a Chaza by ID
export const deleteChaza = async (req, res) => {
    try {
        const chaza = await Chaza.findByIdAndDelete(req.params.id);
        if (!chaza) {
            return res.status(404).send({ message: 'Chaza not found' });
        }
        res.send({ message: 'Chaza deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

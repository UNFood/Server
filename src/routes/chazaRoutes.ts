import express from 'express';
import Chaza from '../models/Chaza';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    const chaza = new Chaza(req.body);
    try {
        const savedChaza = await chaza.save();
        res.send(savedChaza);
    } catch (err) {
        res.status(400).send(err);
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const chazas = await Chaza.find().populate('owner').populate('products');
        res.send(chazas);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const chaza = await Chaza.findById(req.params.id).populate('owner').populate('products');
        res.send(chaza);
    } catch (err) {
        res.status(400).send(err);
    }
});

// UPDATE
router.patch('/:id', async (req, res) => {
    try {
        const updatedChaza = await Chaza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedChaza);
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const removedChaza = await Chaza.findByIdAndRemove(req.params.id);
        res.send(removedChaza);
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;

import express from 'express';
import * as ChazaController from '../controllers/chazaController';

const router = express.Router();

router.post('/', ChazaController.createChaza);
router.get('/', ChazaController.getAllChazas);
router.get('/:id', ChazaController.getChazaById);
router.put('/:id', ChazaController.updateChaza);
router.delete('/:id', ChazaController.deleteChaza);

export default router;

// chazaRoutes.ts
import { Router } from 'express';
import { createChaza, getAllChazas, getChazaById, updateChaza,deleteChaza} from '../controllers/chazaController';

const router = Router();

router.post('/', createChaza);
router.get('/:id', getChazaById);
router.delete('/:id', deleteChaza);
router.get('/', getAllChazas);
router.patch('/:id', updateChaza);

export default router;

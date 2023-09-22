// chazaRoutes.ts
import { Router } from 'express';
import { createChaza, getAllChazas, getChazaById, updateChaza,deleteChaza} from '../controllers/chaza.controller';

const chaza_router = Router();

chaza_router.post('/', createChaza);
chaza_router.get('/:id', getChazaById);
chaza_router.delete('/:id', deleteChaza);
chaza_router.get('/', getAllChazas);
chaza_router.patch('/:id', updateChaza);

export default chaza_router;

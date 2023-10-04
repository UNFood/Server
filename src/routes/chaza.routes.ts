// chazaRoutes.ts
import { Router } from 'express';
import chaza from '../controllers/chaza.controller';
const chaza_router = Router();

//Routes
chaza_router.get('/chaza', chaza.getChaza);
chaza_router.get('/chazas', chaza.getAllChazas);
chaza_router.post('/createChaza', chaza.createChaza);
chaza_router.put('/updateChaza', chaza.updateChaza);    
chaza_router.delete('/deleteChaza', chaza.deleteChaza);

export default chaza_router;
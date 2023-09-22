import { Router} from "express";

import product_router  from './product.routes';
import user_router from './user.routes';
import chaza_router from './chaza.routes';

const router_manager = Router();

//Add routes to api
router_manager.use('/v1/product', product_router);
router_manager.use('/v1/user', user_router);
router_manager.use('/v1/chaza', chaza_router);

export default router_manager;
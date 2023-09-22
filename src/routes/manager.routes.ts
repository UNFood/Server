import { Router} from "express";

import router from './product.routes';

const router_manager = Router();

//Add routes to api
router_manager.use('/product', router);

export default router_manager;
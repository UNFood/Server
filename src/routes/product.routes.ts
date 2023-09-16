// routes/product.routes.ts
import express from 'express';
import product  from '../controllers/product.controller';

const router = express.Router();

//Routes
router.get('/products', product.getAllProducts);
router.post('/createProduct', product.createProduct);
router.put('/updateProduct', product.updateProduct);    
router.delete('/deleteProduct', product.deleteProduct);

export default router;
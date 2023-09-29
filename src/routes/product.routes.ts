// routes/product.routes.ts
import express from 'express';
import product  from '../controllers/product.controller';
import { upload } from '../middlewares/s3'

const product_router = express.Router();

//Routes
product_router.get('/product', product.getProduct);
product_router.get('/products', product.getAllProducts);
product_router.post('/createProduct', product.createProduct);
product_router.put('/updateProduct', product.updateProduct);    
product_router.delete('/deleteProduct', product.deleteProduct);

product_router.post('/uploadImage', upload.single("file"), (req, res) => {
    console.log(req.files)
    res.json({message: 'file uploaded'})
});

export default product_router;
import express from "express";
const router = express.Router();
import productController from "../controllers/ProductController.js";
import auth from '../middlewares/auth.js';

router.get('/:id', productController.get); 
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);
router.post('/add', auth, productController.add);
router.put('/image/:id', auth, productController.image); 
router.get('/user/:id', auth,productController.getProductUser);
router.get('/', auth,productController.getAll);

export default router; 
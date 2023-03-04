import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import categoryController from "../controllers/CategoryController.js";

router.get('/:categoryName', categoryController.get);
router.get('/', categoryController.index); 

export default router; 
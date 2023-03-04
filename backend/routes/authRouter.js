import express from "express";
const router = express.Router();
import authController from "../controllers/AuthController.js";

router.post('/signin', authController.signin);
router.post('/refresh', authController.refresh);

export default router; 
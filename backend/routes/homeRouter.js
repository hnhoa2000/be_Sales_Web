import express from "express";
const router = express.Router();
import homeController from "../controllers/HomeController.js";

router.use('/', homeController.index);

export default router;
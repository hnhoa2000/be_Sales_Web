import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import accountController from "../controllers/AccountController.js";

router.post('/signup', accountController.signup);
router.get('/profile', auth, accountController.profile);
router.put('/profile', auth, accountController.updateProfile);
router.put('/avatar', auth, accountController.updateAvatar);

export default router; 
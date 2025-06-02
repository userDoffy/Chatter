import express from 'express';
import { signup, login,twoFactorAuth,getCurrentUser,logout} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/two-factor-auth', twoFactorAuth);
router.post('/login', login);
router.get('/get-current-user', authMiddleware, getCurrentUser);
router.get('/logout', authMiddleware,logout);

export default router;
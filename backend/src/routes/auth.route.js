import express from 'express';
const router = express.Router();
import { signup,login, logout,authCheck } from '../controllers/auth.controller.js';
import userMiddleware from '../middleware/userMiddleware.js';

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me',userMiddleware,authCheck);


export default router;
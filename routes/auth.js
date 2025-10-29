import express from 'express';
import { register, login, getProfile} from './controller/authController.js';
import auth from '../middleware/auth.js';
import {body} from 'express-validator';

const router = express.Router();


router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters')
], register);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], login);

router.get('/profile', auth, getProfile);

export default router;
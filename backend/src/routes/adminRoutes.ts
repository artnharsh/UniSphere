import express from 'express';
import { body } from 'express-validator';
import { adminLogin } from '../controllers/adminController';

const router = express.Router();

// Validation middleware
const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/login', loginValidation, adminLogin);

export default router; 
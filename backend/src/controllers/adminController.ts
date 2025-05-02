import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ 
      adminId: admin._id,
      role: 'admin'
    }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Admin login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error: any) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      message: 'Error logging in admin', 
      error: error.message 
    });
  }
}; 
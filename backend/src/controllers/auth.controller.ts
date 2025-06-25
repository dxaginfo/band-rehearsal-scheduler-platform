import { Request, Response } from 'express';
import { prisma } from '../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Input validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Controller methods
export const register = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(validatedData.password, salt);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
      },
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );
    
    // Return user data (excluding password) and token
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = loginSchema.parse(req.body);
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(validatedData.password, user.passwordHash);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );
    
    // Return user data (excluding password) and token
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // User is already attached to request by auth middleware
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        createdAt: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
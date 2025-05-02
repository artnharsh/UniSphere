import express from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import {
  createEvent,
  getEvents,
  getUpcomingEvents,
  getEventsByCategory,
  searchEvents,
  registerForEvent,
} from '../controllers/eventController';

const router = express.Router();

// Validation middleware
const validateEvent = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('venue').trim().notEmpty().withMessage('Venue is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['sports', 'cultural', 'department', 'training'])
    .withMessage('Invalid category'),
];

// Public routes
router.get('/', getEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/category/:category', getEventsByCategory);
router.get('/search', searchEvents);

// Protected routes
router.post('/', authenticate, validateEvent, createEvent);
router.post('/:eventId/register', authenticate, registerForEvent);
router.post('/:eventId/unregister', authenticate, registerForEvent);

export default router; 
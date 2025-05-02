import { Response } from 'express';
import { Event, IEvent } from '../models/Event';
import { Registration } from '../models/Registration';
import { AuthRequest } from '../middleware/auth';
import mongoose, { Types } from 'mongoose';

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date, time, venue, category } = req.body;
    
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const event = new Event({
      title,
      description,
      date,
      time,
      venue,
      category,
      organizer: req.user._id,
      attendees: []
    });
    
    await event.save();
    res.status(201).json(event);
  } catch (error: any) {
    console.error('Create event error:', error);
    res.status(500).json({ 
      message: 'Error creating event', 
      error: error.message 
    });
  }
};

export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name email')
      .sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error: any) {
    console.error('Get events error:', error);
    res.status(500).json({ 
      message: 'Error fetching events', 
      error: error.message 
    });
  }
};

export const getUpcomingEvents = async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const events = await Event.find({
      date: { $gte: today.toISOString().split('T')[0] }
    })
      .populate('organizer', 'name email')
      .sort({ date: 1, time: 1 })
      .limit(4);
    
    res.json(events);
  } catch (error: any) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({ 
      message: 'Error fetching upcoming events', 
      error: error.message 
    });
  }
};

export const getEventsByCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { category } = req.params;
    const events = await Event.find({ category })
      .populate('organizer', 'name email')
      .sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error: any) {
    console.error('Get events by category error:', error);
    res.status(500).json({ 
      message: 'Error fetching events by category', 
      error: error.message 
    });
  }
};

export const searchEvents = async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;
    const events = await Event.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { venue: { $regex: q, $options: 'i' } }
      ]
    })
      .populate('organizer', 'name email')
      .sort({ date: 1, time: 1 });
    res.json(events);
  } catch (error: any) {
    console.error('Search events error:', error);
    res.status(500).json({ 
      message: 'Error searching events', 
      error: error.message 
    });
  }
};

export const registerForEvent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const userId = req.user._id;
    const userIndex = event.attendees.findIndex(id => id.equals(userId));
    const isUnregister = req.path.endsWith('/unregister');
    
    if (isUnregister) {
      if (userIndex === -1) {
        return res.status(400).json({ message: 'User is not registered for this event' });
      }
      
      // Remove user from attendees list
      event.attendees.splice(userIndex, 1);
      
      // Remove registration from Registration collection
      await Registration.findOneAndDelete({ 
        eventId: event._id, 
        userId: userId 
      });
    } else {
      if (userIndex !== -1) {
        return res.status(400).json({ message: 'User is already registered for this event' });
      }
      
      // Add user to attendees list
      event.attendees.push(userId);
      
      // Create new registration in Registration collection
      const registration = new Registration({
        eventId: event._id,
        userId: userId,
        name: req.body.name,
        email: req.body.email,
        prn: req.body.prn,
        division: req.body.division,
        year: req.body.year,
        department: req.body.department
      });
      
      await registration.save();
    }
    
    await event.save();
    res.json(event);
  } catch (error: any) {
    console.error('Register for event error:', error);
    res.status(500).json({ 
      message: 'Error registering for event', 
      error: error.message 
    });
  }
};

export const deletePastEvents = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find all events with dates before today
    const pastEvents = await Event.find({
      date: { $lt: today.toISOString().split('T')[0] }
    });

    // Delete all registrations for these events
    for (const event of pastEvents) {
      await Registration.deleteMany({ eventId: event._id });
    }

    // Delete the events themselves
    const result = await Event.deleteMany({
      date: { $lt: today.toISOString().split('T')[0] }
    });

    console.log(`Deleted ${result.deletedCount} past events and their registrations`);
  } catch (error: any) {
    console.error('Delete past events error:', error);
  }
}; 
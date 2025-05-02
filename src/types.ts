export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'sports' | 'cultural' | 'department' | 'training';
  organizer: string | User;
  attendees: string[];
  imageUrl?: string;
}

export type EventFormData = Omit<Event, '_id' | 'attendees'>;

export type CategoryFilter = 'all' | 'sports' | 'cultural' | 'department' | 'training';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer';
  department?: string;
  year?: string;
  avatar?: string;
}
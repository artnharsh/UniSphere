import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Event, EventFormData, CategoryFilter } from '../types';
import { EventCard } from '../components/EventCard';
import { EventForm } from '../components/EventForm';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { CategoryNav } from '../components/CategoryNav';
import { eventService } from '../services/api';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];

export function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryFilter>('all');
  const [currentUser] = useState('John Doe');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await eventService.getAllEvents();
      setEvents(response);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEvent = async (eventData: EventFormData) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents([...events, newEvent]);
      setShowForm(false);
      // Refresh events to ensure we have the latest data
      fetchEvents();
    } catch (err) {
      console.error('Error creating event:', err);
      // You might want to show an error message to the user here
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      // Add API call to delete event here when implemented
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      await eventService.registerForEvent(eventId);
      // Refresh events to get updated attendees list
      fetchEvents();
    } catch (err) {
      console.error('Error registering for event:', err);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => 
      currentCategory === 'all' ? true : event.category === currentCategory
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [events, currentCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <LeftSidebar
            onCreatePost={() => setShowForm(true)}
            username={currentUser}
          />
        </div>

        <main className="col-span-6">
          {showForm && (
            <div className="mb-8 bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Event</h2>
                <EventForm onSubmit={handleAddEvent} />
              </div>
            </div>
          )}

          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading events...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No events yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
              </div>
            ) : (
              filteredEvents.map(event => (
                <EventCard
                  key={event._id}
                  event={event}
                  onDelete={handleDeleteEvent}
                  onRegister={handleRegister}
                  currentUser={currentUser}
                />
              ))
            )}
          </div>
        </main>

        <div className="col-span-3">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
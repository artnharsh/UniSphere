import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Clock, UserPlus } from 'lucide-react';
import { eventService, RegistrationData } from '../services/api';
import { Event } from '../types';
import { useAuth } from '../contexts/AuthContext';
import EventRegistrationModal from './EventRegistrationModal';

interface EventListProps {
  category?: string;
}

const EventList: React.FC<EventListProps> = ({ category }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registeringEventId, setRegisteringEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, [category]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let response;
      if (category) {
        response = await eventService.getEventsByCategory(category);
      } else {
        response = await eventService.getAllEvents();
      }
      setEvents(response);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = (event: Event) => {
    if (!user) {
      setError('Please login to register for events');
      return;
    }
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleUnregisterClick = async (event: Event) => {
    if (!user) return;

    try {
      setRegisteringEventId(event._id);
      await eventService.unregisterFromEvent(event._id);
      // Update the local events state immediately
      setEvents(prevEvents => 
        prevEvents.map(ev => 
          ev._id === event._id 
            ? { ...ev, attendees: ev.attendees.filter(id => id !== user.id) }
            : ev
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to unregister from event');
    } finally {
      setRegisteringEventId(null);
    }
  };

  const handleRegistrationSubmit = async (data: RegistrationData) => {
    if (!selectedEvent || !user) return;

    try {
      setRegisteringEventId(selectedEvent._id);
      await eventService.registerForEvent(selectedEvent._id, data);
      setShowRegistrationModal(false);
      
      // Update the local events state immediately
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event._id === selectedEvent._id 
            ? { ...event, attendees: [...event.attendees, user.id] }
            : event
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to register for event');
    } finally {
      setRegisteringEventId(null);
      setSelectedEvent(null);
    }
  };

  const isUserRegistered = (event: Event) => {
    if (!user) return false;
    return event.attendees.includes(user.id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Events` : 'All Events'}
        </h2>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No events found in this category.
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.venue}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees?.length || 0} attendees
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Organized by: {typeof event.organizer === 'object' ? event.organizer.name : event.organizer}
                  </div>
                  {isUserRegistered(event) ? (
                    <button
                      onClick={() => handleUnregisterClick(event)}
                      disabled={registeringEventId === event._id}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white ${
                        registeringEventId === event._id
                          ? 'bg-red-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      {registeringEventId === event._id ? 'Unregistering...' : 'Unregister'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegisterClick(event)}
                      disabled={registeringEventId === event._id}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white ${
                        registeringEventId === event._id
                          ? 'bg-indigo-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      {registeringEventId === event._id ? 'Registering...' : 'Register'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedEvent && (
        <EventRegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
            setSelectedEvent(null);
          }}
          onSubmit={handleRegistrationSubmit}
          eventTitle={selectedEvent.title}
        />
      )}
    </div>
  );
};

export default EventList; 
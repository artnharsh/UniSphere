import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { eventService, Event } from '../services/api';
import { Calendar, MapPin, User } from 'lucide-react';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const query = new URLSearchParams(location.search).get('q');
        if (query) {
          const results = await eventService.searchEvents(query);
          setEvents(results);
        }
      } catch (err) {
        console.error('Error searching events:', err);
        setError('Failed to search events');
      } finally {
        setIsLoading(false);
      }
    };

    searchEvents();
  }, [location.search]);

  const formatDateTime = (date: string, time: string) => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 animate-pulse">Loading search results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No events found matching your search</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Search Results for <span className="text-indigo-600">"{new URLSearchParams(location.search).get('q')}"</span>
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
            <p className="mt-2 text-gray-600">{event.description}</p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1 text-indigo-500" />
              {formatDateTime(event.date, event.time)}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1 text-indigo-500" />
              {event.venue}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-1 text-indigo-500" />
              Organized by: <span className="text-indigo-600 ml-1">{event.organizer?.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 
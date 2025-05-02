import React from 'react';
import { Trash2, Users, MapPin, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
  onRegister: (id: string) => void;
  currentUser: string;
}

export function EventCard({ event, onDelete, onRegister, currentUser }: EventCardProps) {
  const isRegistered = event.attendees.includes(currentUser);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
          <button
            onClick={() => onDelete(event._id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-gray-600">{event.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.attendees.length} attending</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-500">Organized by {event.organizer}</span>
          <button
            onClick={() => onRegister(event._id)}
            className={`px-4 py-2 rounded-lg font-medium ${
              isRegistered
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            {isRegistered ? 'Unregister' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
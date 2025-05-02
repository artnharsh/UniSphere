import React from 'react';
import { Bell, Calendar, Users } from 'lucide-react';

export function RightSidebar() {
  const upcomingEvents = [
    { id: 1, title: 'Tech Fest 2025', date: 'Mar 15' },
    { id: 2, title: 'Annual Sports Meet', date: 'Mar 20' },
    { id: 3, title: 'Cultural Night', date: 'Mar 25' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
          Upcoming Events
        </h3>
        <div className="mt-4 space-y-3">
          {upcomingEvents.map(event => (
            <div key={event._id} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{event.title}</span>
              <span className="text-xs text-gray-500">{event.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-indigo-600" />
          Notifications
        </h3>
        <div className="mt-4 space-y-3">
          <div className="text-sm text-gray-600">
            New event posted in Sports category
          </div>
          <div className="text-sm text-gray-600">
            Your event "Tech Workshop" is tomorrow
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Users className="h-5 w-5 mr-2 text-indigo-600" />
          Active Organizers
        </h3>
        <div className="mt-4 space-y-3">
          <div className="text-sm text-gray-600">Sports Committee</div>
          <div className="text-sm text-gray-600">Cultural Club</div>
          <div className="text-sm text-gray-600">Technical Society</div>
        </div>
      </div>
    </div>
  );
}
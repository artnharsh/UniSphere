import React from 'react';
import { PlusCircle, User } from 'lucide-react';

interface LeftSidebarProps {
  onCreatePost: () => void;
  username: string;
}

export function LeftSidebar({ onCreatePost, username }: LeftSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 rounded-full p-2">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{username}</h3>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>
        <button
          onClick={onCreatePost}
          className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Mail, BookOpen, Award } from 'lucide-react';

export function Profile() {
  // TODO: Replace with actual user data
  const user = {
    name: 'John Doe',
    role: 'student',
    department: 'Computer Science',
    year: '3rd Year',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    eventsAttended: 12,
    eventsOrganized: 3,
    achievements: [
      'Best Technical Project Award',
      'Sports Meet Winner',
      'Cultural Fest Coordinator',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Campus Connect</h1>
            </div>
            <Link
              to="/dashboard"
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <img className="h-24 w-24 rounded-full" src={user.avatar} alt={user.name} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm font-medium text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.department}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Year</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.year}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Activity Summary</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Events Attended</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.eventsAttended}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Events Organized</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.eventsOrganized}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:col-span-2">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {user.achievements.map((achievement, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="text-sm text-gray-900">{achievement}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
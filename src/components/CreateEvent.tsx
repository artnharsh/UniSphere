import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/api';
import { Calendar, Clock, MapPin, Tag, AlertCircle, X } from 'lucide-react';

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
}

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: 'sports',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await eventService.createEvent(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Event
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details to create your event
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="block w-full pl-3 pr-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                className="block w-full pl-3 pr-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-xs font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-xs font-medium text-gray-700 mb-1">
                  Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="venue" className="block text-xs font-medium text-gray-700 mb-1">
                Venue
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Enter venue location"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  id="category"
                  name="category"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200 appearance-none"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="department">Department</option>
                  <option value="training">Training and Placement</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent; 
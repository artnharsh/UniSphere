import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Bell, Calendar, Users, Briefcase, GraduationCap, Plus, Search, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { eventService, Event } from '../services/api';
import { debounce } from 'lodash';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'All Events', path: '/dashboard', icon: <Calendar className="h-5 w-5" /> },
  { name: 'Sports', path: '/dashboard/sports', icon: <Users className="h-5 w-5" /> },
  { name: 'Cultural', path: '/dashboard/cultural', icon: <Bell className="h-5 w-5" /> },
  { name: 'Department', path: '/dashboard/department', icon: <GraduationCap className="h-5 w-5" /> },
  { name: 'Training and Placement', path: '/dashboard/training', icon: <Briefcase className="h-5 w-5" /> },
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const events = await eventService.getUpcomingEvents();
        setUpcomingEvents(events.slice(0, 4));
      } catch (err) {
        console.error('Error fetching upcoming events:', err);
        setError('Failed to fetch upcoming events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = debounce(async (query: string) => {
    if (!query.trim()) return;
    try {
      const results = await eventService.searchEvents(query);
      if (results.length > 0) {
        navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
      }
    } catch (err) {
      console.error('Error searching events:', err);
    }
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  UniSphere
                </Link>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              {/* Search Bar */}
              <div className="max-w-lg w-full lg:max-w-xs mr-4">
                <form onSubmit={handleSearchSubmit}>
                  <label htmlFor="search" className="sr-only">Search events</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow duration-200"
                      placeholder="Search events..."
                      type="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </form>
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200">
                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-6">
            {/* Upcoming Events Sidebar */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-sm text-gray-500">Loading events...</div>
                  ) : error ? (
                    <div className="text-sm text-red-500">{error}</div>
                  ) : upcomingEvents.length === 0 ? (
                    <div className="text-sm text-gray-500">No upcoming events</div>
                  ) : (
                    upcomingEvents.map((event) => (
                      <div key={event._id} className="border-b pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200">
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          <Calendar className="inline-block h-4 w-4 mr-1" />
                          {formatDateTime(event.date, event.time)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          <MapPin className="inline-block h-4 w-4 mr-1" />
                          {event.venue}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* User Profile Card */}
              <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Create Event Button */}
              <Link
                to="/dashboard/create-event"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="h-5 w-5 inline-block mr-2" />
                Create Event
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="col-span-3">
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 
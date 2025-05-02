import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Bell, ClipboardList } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-8">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="ml-3 text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">UniSphere</h2>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Connect, Create,</span>
                  <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Celebrate Together</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Your one-stop platform for managing and discovering college events. From sports to cultural activities, find everything you need to stay connected with your college community.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
            <img
              className="h-full w-auto object-contain mix-blend-multiply"
              src="/landing-illustration.svg"
              alt="College community illustration"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage college events
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Discover, create, and manage events all in one place. Connect with your college community like never before.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Event Management</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Create and manage events with ease. Set up event details, manage registrations, and track attendance.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Community Engagement</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Connect with other students, organizers, and departments. Stay updated with the latest events and activities.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Event Categories</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Browse events by category: Sports, Cultural, Department, Training and Placement, and more.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <Bell className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Real-time Notifications</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get instant notifications about new events, updates, and important announcements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
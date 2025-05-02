import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SignIn } from './pages/SignIn';
import RegisterForm from './components/RegisterForm';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import SearchResults from './pages/SearchResults';
import AdminLogin from './components/AdminLogin';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/register"
            element={
              <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                  </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <RegisterForm />
                  </div>
                </div>
              </div>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <EventList />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/sports"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <EventList category="sports" />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/cultural"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <EventList category="cultural" />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/department"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <EventList category="department" />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/training"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <EventList category="training" />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/create-event"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <CreateEvent />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <UserProfile />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/search"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <SearchResults />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
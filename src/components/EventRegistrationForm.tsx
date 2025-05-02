import React, { useState } from 'react';
import { User, Mail, Hash, Building, GraduationCap, Calendar } from 'lucide-react';

interface RegistrationFormData {
  name: string;
  email: string;
  prn: string;
  division: string;
  department: string;
  year: string;
}

const EventRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: 'om',
    email: 'om.gole23@pccoepune.org',
    prn: '',
    division: '',
    department: '',
    year: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-700 via-purple-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full relative">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl h-full flex items-center justify-center border border-white/20">
                <Calendar className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
              Register for WeekND
            </h2>
            <p className="text-gray-300 text-sm">
              Join us for an exciting weekend of innovation and learning
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Read-only fields with different styling */}
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-200">{formData.name}</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-200">{formData.email}</span>
                </div>
              </div>
            </div>

            {/* Input fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">PRN Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="prn"
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your PRN number"
                    value={formData.prn}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Division</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="division"
                      required
                      className="block w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm appearance-none transition-all duration-200"
                      value={formData.division}
                      onChange={handleChange}
                    >
                      <option value="" className="bg-gray-900">Select</option>
                      <option value="A" className="bg-gray-900">A</option>
                      <option value="B" className="bg-gray-900">B</option>
                      <option value="C" className="bg-gray-900">C</option>
                      <option value="D" className="bg-gray-900">D</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="year"
                      required
                      className="block w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm appearance-none transition-all duration-200"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value="" className="bg-gray-900">Select</option>
                      <option value="1" className="bg-gray-900">First</option>
                      <option value="2" className="bg-gray-900">Second</option>
                      <option value="3" className="bg-gray-900">Third</option>
                      <option value="4" className="bg-gray-900">Fourth</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="department"
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your department name"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                className="px-6 py-3 text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 backdrop-blur-sm border border-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm; 
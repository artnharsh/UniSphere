import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RegistrationData } from '../services/api';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RegistrationData) => void;
  eventTitle: string;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  eventTitle,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<RegistrationData>({
    name: user?.name || '',
    email: user?.email || '',
    prn: '',
    division: '',
    year: '1',
    department: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Register for {eventTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">PRN</label>
            <input
              type="text"
              value={formData.prn}
              onChange={(e) => setFormData({ ...formData, prn: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              placeholder="Enter your PRN"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Division</label>
            <select
              value={formData.division}
              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              placeholder="Enter your department"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationModal; 
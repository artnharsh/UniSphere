import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ValidationError {
  msg: string;
  param: string;
}

export interface ApiError {
  message: string;
  errors?: ValidationError[];
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'sports' | 'cultural' | 'department' | 'training';
  organizer: {
    _id: string;
    name: string;
    email: string;
  };
  attendees: string[];
  imageUrl?: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  prn: string;
  division: string;
  year: string;
  department: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    try {
      const response = await api.post('/api/users/register', data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 400) {
          const validationErrors = axiosError.response.data.errors;
          if (validationErrors && validationErrors.length > 0) {
            throw new Error(validationErrors.map(err => err.msg).join(', '));
          }
        }
        throw new Error(axiosError.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  },

  login: async (data: LoginData) => {
    try {
      const response = await api.post('/api/users/login', data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 400) {
          const validationErrors = axiosError.response.data.errors;
          if (validationErrors && validationErrors.length > 0) {
            throw new Error(validationErrors.map(err => err.msg).join(', '));
          }
        }
        throw new Error(axiosError.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    try {
      const response = await api.get('/api/users/profile');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch profile');
      }
      throw error;
    }
  },
};

export const eventService = {
  getAllEvents: async () => {
    try {
      const response = await api.get('/api/events');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch events');
      }
      throw error;
    }
  },

  getUpcomingEvents: async () => {
    try {
      const response = await api.get('/api/events/upcoming');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch upcoming events');
      }
      throw error;
    }
  },

  createEvent: async (data: Omit<Event, 'id' | 'attendees'>) => {
    try {
      const response = await api.post('/api/events', {
        ...data,
        attendees: []
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 400) {
          const validationErrors = axiosError.response.data.errors;
          if (validationErrors && validationErrors.length > 0) {
            throw new Error(validationErrors.map(err => err.msg).join(', '));
          }
        }
        throw new Error(axiosError.response?.data?.message || 'Failed to create event');
      }
      throw error;
    }
  },

  searchEvents: async (query: string) => {
    try {
      const response = await api.get(`/api/events/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message || 'Failed to search events');
      }
      throw error;
    }
  },

  getEventsByCategory: async (category: string) => {
    try {
      const response = await api.get(`/api/events/category/${category}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message || 'Failed to fetch events by category');
      }
      throw error;
    }
  },

  registerForEvent: async (eventId: string, data: RegistrationData) => {
    try {
      const response = await api.post(`/api/events/${eventId}/register`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message || 'Failed to register for event');
      }
      throw error;
    }
  },

  unregisterFromEvent: async (eventId: string) => {
    try {
      const response = await api.post(`/api/events/${eventId}/unregister`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message || 'Failed to unregister from event');
      }
      throw error;
    }
  }
}; 
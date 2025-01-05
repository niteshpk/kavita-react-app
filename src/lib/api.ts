import axios from 'axios';
import toast from 'react-hot-toast';
import { handleError } from './error-handler';

// Create API instance with base configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', handleError(error));
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error scenarios
    const message = error.response?.data?.message || 
                   error.response?.data?.error || 
                   handleError(error);

    // Don't show toast for 401 errors during auth operations
    const isAuthEndpoint = error.config?.url?.match(/\/(login|register|forgot-password)/);
    if (!isAuthEndpoint || error.response?.status !== 401) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
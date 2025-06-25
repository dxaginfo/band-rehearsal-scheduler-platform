import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if needed
      localStorage.removeItem('token');
      
      // If not on login page, redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden errors
    if (error.response && error.response.status === 403) {
      console.error('Forbidden resource');
    }
    
    // Handle 404 Not Found errors
    if (error.response && error.response.status === 404) {
      console.error('Resource not found');
    }
    
    // Handle 500 Server errors
    if (error.response && error.response.status >= 500) {
      console.error('Server error');
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      console.error('Network error - Make sure API is running');
    }
    
    return Promise.reject(error);
  }
);

export default api;
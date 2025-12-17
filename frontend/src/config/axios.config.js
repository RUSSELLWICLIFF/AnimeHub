import axios from 'axios';

// Create axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            // Server responded with error status
            switch (error.response.status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('API Error:', error.response.data);
            }
        } else if (error.request) {
            // Request made but no response received
            console.error('Network error - no response received');
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;


// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

//  Request Interceptor - Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🚀 API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

//  Response Interceptor - Handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(' API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error(' API Error:', error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
      console.warn(' Unauthorized - Clearing auth and redirecting to login');
      
      // Clear all storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('user_id');
      
      // Redirect to login
      window.location.href = '/signin';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
import axios from 'axios';

import toast from 'react-hot-toast';



const api = axios.create({

  baseURL: 'http://localhost:8000',

  headers: {

    'Content-Type': 'application/json',

  },

  withCredentials: true

});



// Add a request interceptor

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



// Add a response interceptor

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem('token');

      localStorage.removeItem('userRole');

      toast.error('Invalid credentials or session expired.');

      if (!window.location.pathname.includes('/login')) {

        window.location.href = '/login';

      }

    } else if (error.response?.status === 403) {

      toast.error('Access denied.');

      redirectBasedOnRole();

    }

    return Promise.reject(error);

  }

);



export const redirectBasedOnRole = () => {

  const userRole = localStorage.getItem('userRole');

  switch (userRole) {

    case 'admin':

      window.location.href = '/admin-dashboard';

      break;

    case 'student':

      window.location.href = '/student-dashboard';

      break;

    case 'mentor':

      window.location.href = '/mentor-dashboard';

      break;

    default:

      window.location.href = '/login';

  }

};



export default api; 































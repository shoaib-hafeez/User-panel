import axiosClient from '../lib/axios';

// Login API
export const loginUser = (credentials) => {
  return axiosClient.post('/users/login', credentials);
};

// Signup API
export const signupUser = (data) => {
  return axiosClient.post('/users/register', data);
};

export const logoutUser = ( ) => {
  return axiosClient.post ('/users/logout')
}


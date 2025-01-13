import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.freeapi.app/api/v1',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;



import axios from 'axios';

export const baseURL = import.meta.env.VITE_PUBLIC_API_BASE_URL;
const apiUrl: string = `${baseURL}/api/`;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setBearerToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;

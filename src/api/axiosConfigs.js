import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mws.razysoft.com/api',
});

// این بخش حیاتی است: چسباندن توکن به تمام درخواست‌ها
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


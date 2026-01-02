import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mws.razysoft.com/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  // این همان توکنی است که در پستمن جواب گرفتی
  config.headers['AppToken'] = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA5MzM4MDMwNDA1IiwiaXNjdXN0b21lciI6InRydWUiLCJSZWdpc3RlckNvbXBsZXRlZCI6IlRSVUUiLCJuYmYiOjE3NjY2NTY3NDMsImV4cCI6MTc2OTI0ODc0MywiaWF0IjoxNzY2NjU2NzQzfQ.BU6oiDZYB6f78y9Cv10tC1CCYK_vqQb0XnfQMtMLWjuyN9BUkhXa-7vTFMvVq9eWCOQf1NQ6NywL293BKJ59lw';
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
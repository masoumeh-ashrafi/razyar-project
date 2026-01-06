import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mws.razysoft.com/api',
  timeout: 10000,
});

// این بخش توکن را به تمام درخواست‌ها می‌چسباند
api.interceptors.request.use((config) => {

  config.headers['AppToken'] = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA5MzM4MDMwNDA1IiwiaXNjdXN0b21lciI6InRydWUiLCJSZWdpc3RlckNvbXBsZXRlZCI6IlRSVUUiLCJuYmYiOjE3NjY2NTY3NDMsImV4cCI6MTc2OTI0ODc0MywiaWF0IjoxNzY2NjU2NzQzfQ.BU6oiDZYB6f78y9Cv10tC1CCYK_vqQb0XnfQMtMLWjuyN9BUkhXa-7vTFMvVq9eWCOQf1NQ6NywL293BKJ59lw';
  
  const token = localStorage.getItem('token'); // مطمئن شو توکن را با نام token ذخیره کردی
  if (token) {
    // اگر توکن در سیستم کاربر موجود بود، جایگزین می‌شود
    config.headers['AppToken'] = token; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mws.razysoft.com/api',
});

// این بخش توکن را به تمام درخواست‌ها می‌چسباند
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // مطمئن شو توکن را با نام token ذخیره کردی
  if (token) {
    // طبق عکس پست‌من شما، سرور AppToken می‌خواهد
    config.headers['AppToken'] = token; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
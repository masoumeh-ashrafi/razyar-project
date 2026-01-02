import './RegisterPage.css';

import React, { useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ NationalCode: '', PhoneNumber: '', ActivityType: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // تابع اعتبارسنجی الگوریتم کد ملی
  const isValidNationalCode = (code) => {
    if (!/^\d{10}$/.test(code)) return false;
    const check = +code[9];
    const sum = code.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check === 11 - sum;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // ۱. بررسی انتخاب نوع فعالیت
    if (!formData.ActivityType) {
      setError('لطفاً نوع فعالیت خود را انتخاب کنید');
      return;
    }

    // ۲. بررسی صحت کد ملی
    if (!isValidNationalCode(formData.NationalCode)) {
      setError('کد ملی وارد شده از نظر ساختاری معتبر نیست');
      return;
    }

    // ۳. بررسی شماره موبایل (باید ۱۱ رقم باشد و با ۰۹ شروع شود)
    if (!/^09\d{9}$/.test(formData.PhoneNumber)) {
      setError('شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد');
      return;
    }

    setLoading(true);

    try {
      // ساخت پلود بر اساس مستندات Postman
      const payload = {
        PhoneNumber: formData.PhoneNumber, // ارسال دقیق شماره ۱۱ رقمی
        NationalCode: formData.NationalCode, // کد ملی ۱۰ رقمی
        Type: formData.ActivityType === 'seller' ? 0 : 1 // طبق مقدار عددی پست‌من (فروشنده=0)
      };

      // ارسال درخواست همراه با AppToken در هدر
      const response = await api.post('/b2b/Customer/SignUp', payload, {
        headers: {
          'AppToken': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEyNTEwMTIiLCJrZXkiOiIxNiIsImV4cGlyZURhdGUiOiIyMDI2LzAxLzIyIiwiSXNBdmFpbGFibGUiOiJUUlVFIiwibmJmIjoxNzY2NDkxNTk1LCJleHAiOjE3NjkwODM1OTUsImlhdCI6MTc2NjQ5MTU5NX0.gqDZn-FsOkW6Y61DiLvwZRvuDyzYgHkoh4IgZiB4xJVqG6RMFTuu5t8o8sV277ojg25Y_J77lVDh5gKWYr_NqQ'
        }
      });

      // ذخیره شماره برای استفاده در صفحه تایید
      localStorage.setItem('tempPhone', formData.PhoneNumber);
      navigate('/verify');
      
    } catch (err) {
      // نمایش پیام خطای دقیق سرور یا پیام پیش‌فرض
      const serverMessage = err.response?.data?.Message;
      setError(serverMessage || "خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.");
      console.error("Server Error Details:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo-container">
          <img src={logoRazy} alt="رازی" className="logo-img" />
        </div>
        <h2 className="register-title">ثبت‌نام</h2>
        
        <form onSubmit={handleRegister}>
          {/* انتخاب نوع فعالیت */}
          <div className="input-group">
            <label className="register-label">نوع فعالیت</label>
            <select 
              className="register-select"
              value={formData.ActivityType}
              onChange={(e) => setFormData({...formData, ActivityType: e.target.value})}
            >
              <option value="">انتخاب کنید...</option>
              <option value="seller">فروشنده هستم</option>
              <option value="supplier">تامین کننده هستم</option>
            </select>
          </div>

          {/* ورود کد ملی */}
          <div className="input-group">
            <label className="register-label">کد ملی</label>
            <input 
              type="text" 
              maxLength="10"
              className="register-custom-input"
              placeholder="مثال: 3861147904"
              value={formData.NationalCode}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                setFormData({...formData, NationalCode: e.target.value});
              }}
            />
          </div>

          {/* ورود شماره همراه */}
          <div className="input-group">
            <label className="register-label">شماره همراه</label>
            <div className="phone-input-container">
              <div className="country-code">+۹۸</div>
              <input 
                type="text" 
                maxLength="11"
                className="phone-input"
                placeholder="09338030405"
                value={formData.PhoneNumber}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({...formData, PhoneNumber: e.target.value});
                }}
              />
            </div>
          </div>

          {error && <p className="error-text-small">{error}</p>}

          <button type="submit" className="main-button" disabled={loading}>
            {loading ? 'در حال ارسال...' : 'تایید و دریافت کد'}
          </button>
        </form>

        <p className="footer-text">
          قبلاً ثبت‌نام کرده‌اید؟ 
          <span onClick={() => navigate('/login')} className="link-text"> ورود</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
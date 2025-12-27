import './LoginPage.css'; // استایل‌ها از اینجا خوانده می‌شوند

import React, { useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onlyNumber = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("شماره موبایل نامعتبر است. باید با 09 شروع شود.");
      return;
    }

    setLoading(true);
    try {
      // ارسال درخواست لاگین به بک‌اندر
      await api.post('/b2b/Customer/Login', { PhoneNumber: phoneNumber });
      localStorage.setItem('tempPhone', phoneNumber);
      navigate('/verify');
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("خطا در ورود. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logoRazy} alt="رازیار" className="logo-img" />
        </div>

        <h2 className="login-title">ورود به حساب</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="login-label">شماره موبایل</label>
            <div className="phone-input-container">
              <div className="country-code">+۹۸</div>
              <input 
                type="text" 
                maxLength="11"
                placeholder="09123456789" 
                className="phone-input"
                onKeyPress={onlyNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="main-button">
            {loading ? 'در حال ارسال...' : 'ارسال کد ورود'}
          </button>
        </form>

        <p className="footer-text">
          حساب کاربری ندارید؟ <span className="link-text" onClick={() => navigate('/register')}>ثبت‌نام کنید</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
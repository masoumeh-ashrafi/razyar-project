import './LoginPage.css';

import React, { useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // ۱. ولیدیشن شماره موبایل
    if (!phoneNumber) {
      setError('لطفاً شماره موبایل خود را وارد کنید');
      return;
    }
    if (!phoneNumber.startsWith('09') || phoneNumber.length !== 11) {
      setError('شماره موبایل معتبر نیست (باید ۱۱ رقم و با ۰۹ شروع شود)');
      return;
    }

    setLoading(true);

    /* --- بخش شبیه‌ساز (Mock) به دلیل بسته بودن پورت ۴۰۰۱ سرور --- */
    setTimeout(() => {
      console.log("Login Simulated for:", phoneNumber);
      localStorage.setItem('tempPhone', phoneNumber);
      setLoading(false);
      navigate('/verify'); // انتقال به صفحه تایید ۴ رقمی جدید
    }, 1500);

    /* --- بخش ارسال واقعی (پس از رفع مشکل پورت سرور این را فعال می کنیم) ---
    try {
      const response = await api.post('/b2b/Customer/Login', { PhoneNumber: phoneNumber });
      localStorage.setItem('tempPhone', phoneNumber);
      navigate('/verify');
    } catch (err) {
      setError(err.response?.data?.Message || 'خطا در برقراری ارتباط با سرور');
    } finally {
      setLoading(false);
    }
    -------------------------------------------------------------- */
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logoRazy} alt="رازیار" className="logo-img" />
        </div>
        
        <h2 className="login-title">ورود به رازیار</h2>
        <p className="login-subtitle">جهت ورود به پنل، شماره همراه خود را وارد کنید</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="login-label">شماره همراه</label>
            <div className="phone-input-container">
              <div className="country-code">+۹۸</div>
              <input 
                type="text" 
                maxLength="11"
                className="phone-input"
                placeholder="09123456789"
                value={phoneNumber}
                onInput={(e) => {
                  // جلوگیری از تایپ حروف - فقط عدد
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
          </div>

          {error && <p className="error-text-small">{error}</p>}

          <button type="submit" className="main-button" disabled={loading}>
            {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
          </button>
        </form>

        <p className="footer-text">
          هنوز ثبت‌نام نکرده‌اید؟ 
          <span onClick={() => navigate('/register')} className="link-text"> ثبت‌نام</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
import './VerifyPage.css';

import React, { useEffect, useState } from 'react';

import api from '../api/axiosConfigs';
import { useNavigate } from 'react-router-dom';

const VerifyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // ۱۲۰ ثانیه معادل ۲ دقیقه
  const phoneNumber = localStorage.getItem('tempPhone') || '';

  // منطق شمارش معکوس
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // تبدیل ثانیه به فرمت 02:00
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/b2b/Customer/VerifySignUp', { 
        PhoneNumber: phoneNumber,
        VerificationCode: otp 
      });
      if (response.data.token) localStorage.setItem('token', response.data.token);
      navigate('/stock');
    } catch (error) {
      alert("کد تایید اشتباه است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">تایید شماره موبایل</h2>
        <p className="verify-subtitle">کد ارسال شده به {phoneNumber} را وارد کنید</p>

        <form onSubmit={handleSubmit}>
          <div className="otp-input-container">
            <input 
              type="text"
              maxLength="6"
              className="otp-input"
              style={{ width: '100%' }}
              placeholder="- - - - - -"
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading || timer === 0} className="verify-button">
            {loading ? 'در حال بررسی...' : 'تایید و ورود'}
          </button>
        </form>

        <div className="timer-section">
          {timer > 0 ? (
            <p className="resend-text">زمان باقی‌مانده: <span className="timer-count">{formatTime(timer)}</span></p>
          ) : (
            <p className="resend-text">
              کد را دریافت نکردید؟ <span className="resend-link" onClick={() => setTimer(120)}>ارسال مجدد</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
import './PasswordPage.css';

import React, { useState } from 'react';

import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // وضعیت لودینگ
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // شروع لودینگ

    // شبیه‌سازی اتصال به سرور 
    setTimeout(() => {
      if (password) {
        setIsLoading(false); // اتمام لودینگ
        navigate('/stores');
      }
    }, 1500);
  };

  return (
    <div className="password-screen">
      <div className="auth-card">
        <div className="brand-logo">
          <img src={logoRazy} alt="Razy Afzar" />
        </div>
        
        <h2 className="auth-title">رمز عبور را وارد کنید</h2>
        
        <form onSubmit={handleLogin}>
          <div className="field-group">
            <label>رمز عبور</label>
            <input
              type="password"
              placeholder="@swgrhdgnfdb56432@"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-field"
              required
              disabled={isLoading} // غیرفعال کردن ورودی هنگام لودینگ
            />
          </div>
          
          <button 
            type="submit" 
            className={`login-action-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : 'ورود به سیستم'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;

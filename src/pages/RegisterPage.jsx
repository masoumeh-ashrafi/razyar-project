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

    // ۱. بررسی نوع فعالیت
    if (!formData.ActivityType) {
      setError('لطفاً نوع فعالیت خود را انتخاب کنید');
      return;
    }

    // ۲. بررسی صحت کد ملی
    if (!isValidNationalCode(formData.NationalCode)) {
      setError('کد ملی وارد شده از نظر ساختاری معتبر نیست');
      return;
    }

    // ۳. بررسی شماره موبایل
    if (!/^09\d{9}$/.test(formData.PhoneNumber)) {
      setError('شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد');
      return;
    }

    setLoading(true);

    /* --- بخش شبیه‌ساز (چون فعلا پورت سرور ۴۰۰۱ بسته است) --- */
    setTimeout(() => {
      console.log("Registration Simulated for:", formData.PhoneNumber);
      localStorage.setItem('tempPhone', formData.PhoneNumber);
      setLoading(false);
      navigate('/verify'); 
    }, 1500);

    /* --- بخش ارسال واقعی (بعد از باز شدن پورت سرور، این را از کامنت خارج کن) ---
    try {
      const payload = {
        NationalCode: formData.NationalCode,
        PhoneNumber: formData.PhoneNumber,
        Type: formData.ActivityType === 'seller' ? 1 : 2
      };
      await api.post('/b2b/Customer/SignUp', payload);
      localStorage.setItem('tempPhone', formData.PhoneNumber);
      navigate('/verify');
    } catch (err) {
      setError(err.response?.data?.Message || "خطا در اتصال به سرور (پورت ۴۰۰۱)");
    } finally {
      setLoading(false);
    }
    ---------------------------------------------------------- */
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo-container">
          <img src={logoRazy} alt="رازیار" className="logo-img" />
        </div>
        <h2 className="register-title">ثبت‌نام در رازیار</h2>
        
        <form onSubmit={handleRegister}>
          {/* ۱. نوع فعالیت */}
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

          {/* ۲. کد ملی */}
          <div className="input-group">
            <label className="register-label">کد ملی</label>
            <input 
              type="text" 
              maxLength="10"
              className="register-custom-input"
              placeholder="مثال: 0012345678"
              value={formData.NationalCode}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ''); // فقط عدد
                setFormData({...formData, NationalCode: e.target.value});
              }}
            />
          </div>

          {/* ۳. شماره همراه */}
          <div className="input-group">
            <label className="register-label">شماره همراه</label>
            <div className="phone-input-container">
              <div className="country-code">+۹۸</div>
              <input 
                type="text" 
                maxLength="11"
                className="phone-input"
                placeholder="09123456789"
                value={formData.PhoneNumber}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ''); // فقط عدد
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
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
      setError('کد ملی وارد شده معتبر نیست');
      return;
    }

    // ۳. بررسی شماره موبایل (باید دقیقا ۱۱ رقم باشد و با ۰۹ شروع شود)
    if (!/^09\d{9}$/.test(formData.PhoneNumber)) {
      setError('شماره موبایل معتبر نیست (مثال: 09123456789)');
      return;
    }

    setLoading(true);

    try {
      // ساخت پلود ارسالی به سرور
      const payload = {
        NationalCode: formData.NationalCode,
        // اینجا دقیقا شماره‌ای که کاربر وارد کرده (09...) را می‌فرستیم
        PhoneNumber: formData.PhoneNumber, 
        Type: formData.ActivityType === 'seller' ? 1 : 2
      };

      // ارسال درخواست به API
      const response = await api.post('/b2b/Customer/SignUp', payload);
      
      // اگر موفقیت‌آمیز بود، شماره را برای مرحله تایید ذخیره می‌کنیم
      localStorage.setItem('tempPhone', formData.PhoneNumber);
      navigate('/verify');

    } catch (err) {
      console.error("Registration Error:", err);
      
      // مدیریت هوشمند پیام خطا
      if (err.response) {
        // سرور پاسخ داده اما با خطا (مثلا ۴۰۰ یا ۵۰۰)
        const serverMsg = err.response.data?.Message || err.response.data?.message;
        setError(serverMsg || "اطلاعات وارد شده مورد تایید سرور نیست");
      } else if (err.request) {
        // درخواست ارسال شده اما پاسخی دریافت نشده (مشکل پورت ۴۰۰۱ یا اینترنت)
        setError("خطا در اتصال به سرور؛ لطفاً وضعیت پورت ۴۰۰۱ را بررسی کنید");
      } else {
        setError("خطایی در تنظیمات درخواست رخ داد");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{ direction: 'rtl', fontFamily: 'Tahoma' }}>
      <div className="register-card">
        <div className="logo-container">
          <img src={logoRazy} alt="رازیار" className="logo-img" />
        </div>
        <h2 className="register-title">ثبت‌نام در رازیار</h2>
        
        <form onSubmit={handleRegister}>
          {/* ۱. انتخاب نوع فعالیت */}
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

          {/* ۲. وارد کردن کد ملی */}
          <div className="input-group">
            <label className="register-label">کد ملی</label>
            <input 
              type="text" 
              maxLength="10"
              className="register-custom-input"
              placeholder="مثال: 0012345678"
              value={formData.NationalCode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setFormData({...formData, NationalCode: val});
              }}
            />
          </div>

          {/* ۳. وارد کردن شماره همراه */}
          <div className="input-group">
            <label className="register-label">شماره همراه</label>
            <div className="phone-input-container" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="country-code" style={{ padding: '0 10px', color: '#64748b' }}>+۹۸</div>
              <input 
                type="text" 
                maxLength="11"
                className="phone-input"
                style={{ flexGrow: 1, textAlign: 'left', direction: 'ltr' }}
                placeholder="09123456789"
                value={formData.PhoneNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({...formData, PhoneNumber: val});
                }}
              />
            </div>
          </div>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', color: '#ef4444', padding: '10px', borderRadius: '8px', fontSize: '12px', marginBottom: '15px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="main-button" disabled={loading} style={{ width: '100%', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'در حال پردازش...' : 'تایید و دریافت کد'}
          </button>
        </form>

        <p className="footer-text" style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>
          قبلاً ثبت‌نام کرده‌اید؟ 
          <span onClick={() => navigate('/login')} className="link-text" style={{ color: '#f97316', cursor: 'pointer', fontWeight: 'bold', marginRight: '5px' }}> ورود</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
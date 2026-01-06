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

<<<<<<< HEAD
    // ۳. بررسی شماره موبایل (باید ۱۱ رقم باشد و با ۰۹ شروع شود)
=======
    // ۳. بررسی شماره موبایل (باید دقیقا ۱۱ رقم باشد و با ۰۹ شروع شود)
>>>>>>> 0e49202
    if (!/^09\d{9}$/.test(formData.PhoneNumber)) {
      setError('شماره موبایل معتبر نیست (مثال: 09123456789)');
      return;
    }

    setLoading(true);

    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 0e49202
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" style={{ direction: 'rtl', fontFamily: 'Tahoma' }}>
      <div className="register-card">
        <div className="logo-container">
          <img src={logoRazy} alt="رازی" className="logo-img" />
        </div>
        <h2 className="register-title">ثبت‌نام</h2>
        
        <form onSubmit={handleRegister}>
<<<<<<< HEAD
          {/* انتخاب نوع فعالیت */}
=======
          {/* ۱. انتخاب نوع فعالیت */}
>>>>>>> 0e49202
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

<<<<<<< HEAD
          {/* ورود کد ملی */}
=======
          {/* ۲. وارد کردن کد ملی */}
>>>>>>> 0e49202
          <div className="input-group">
            <label className="register-label">کد ملی</label>
            <input 
              type="text" 
              maxLength="10"
              className="register-custom-input"
              placeholder="مثال: 3861147904"
              value={formData.NationalCode}
<<<<<<< HEAD
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                setFormData({...formData, NationalCode: e.target.value});
=======
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setFormData({...formData, NationalCode: val});
>>>>>>> 0e49202
              }}
            />
          </div>

<<<<<<< HEAD
          {/* ورود شماره همراه */}
=======
          {/* ۳. وارد کردن شماره همراه */}
>>>>>>> 0e49202
          <div className="input-group">
            <label className="register-label">شماره همراه</label>
            <div className="phone-input-container" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="country-code" style={{ padding: '0 10px', color: '#64748b' }}>+۹۸</div>
              <input 
                type="text" 
                maxLength="11"
                className="phone-input"
<<<<<<< HEAD
                placeholder="09338030405"
                value={formData.PhoneNumber}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({...formData, PhoneNumber: e.target.value});
=======
                style={{ flexGrow: 1, textAlign: 'left', direction: 'ltr' }}
                placeholder="09123456789"
                value={formData.PhoneNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setFormData({...formData, PhoneNumber: val});
>>>>>>> 0e49202
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
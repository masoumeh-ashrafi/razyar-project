import React, { useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    PhoneNumber: '',
    NationalCode: '',
    Type: 1
  });

  // تابع اعتبارسنحی کد ملی
  const isValidNationalCode = (code) => {
    if (code.length !== 10 || /(\d)\1{9}/.test(code)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(code.charAt(i)) * (10 - i);
    let lastDigit = parseInt(code.charAt(9));
    let remainder = sum % 11;
    return remainder < 2 ? lastDigit === remainder : lastDigit === 11 - remainder;
  };

  // فقط عدد مجاز است
  const onlyNumber = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(formData.PhoneNumber)) {
      alert("شماره موبایل نامعتبر است. باید ۱۱ رقم بوده و با 09 شروع شود.");
      return;
    }
    if (!isValidNationalCode(formData.NationalCode)) {
      alert("کد ملی معتبر نیست.");
      return;
    }

    setLoading(true);
    try {
      await api.post('/b2b/Customer/SignUp', formData);
      localStorage.setItem('tempPhone', formData.PhoneNumber);
      navigate('/verify');
    } catch (error) {
      if (error.response?.status === 400) {
        localStorage.setItem('tempPhone', formData.PhoneNumber);
        navigate('/verify');
      } else {
        alert("خطا در برقراری ارتباط");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.container}>
      <div style={s.card}>
        <div style={s.logoContainer}>
          <img src={logoRazy} alt="رازیار" style={s.logoImg} />
        </div>

        <h2 style={s.title}>ثبت نام</h2>

        <form onSubmit={handleSubmit}>
          {/* انتخاب نوع فعالیت */}
          <div style={s.inputGroup}>
            <label style={s.label}>نوع فعالیت</label>
            <div style={s.selectWrapper}>
              <select 
                style={s.select}
                value={formData.Type}
                onChange={(e) => setFormData({...formData, Type: parseInt(e.target.value)})}
              >
                <option value={1}>من تامین کننده هستم</option>
                <option value={2}>من فروشنده هستم</option>
              </select>
              <span style={s.selectIcon}>▼</span>
            </div>
          </div>

          {/* فیلد کد ملی - چپ‌چین */}
          <div style={s.inputGroup}>   
            <label style={s.label}>کد ملی (۱۰ رقم)</label>
            <input 
              type="text" 
              maxLength="10"
              placeholder="0012345678" 
              style={s.inputLeft}
              onKeyPress={onlyNumber}
              onChange={(e) => setFormData({...formData, NationalCode: e.target.value})}
              required
            />
          </div>

          {/* فیلد موبایل - +98 سمت چپ و چپ‌چین */}
          <div style={s.inputGroup}>
            <label style={s.label}>شماره موبایل (شروع با 09)</label>
            <div style={s.phoneInputContainer}>
              <div style={s.countryCode}>+۹۸</div>
              <input 
                type="text" 
                maxLength="11"
                placeholder="09123456789" 
                style={s.phoneInput}
                onKeyPress={onlyNumber}
                onChange={(e) => setFormData({...formData, PhoneNumber: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={s.mainButton}>
            {loading ? 'در حال ارسال...' : 'ثبت اطلاعات'}
          </button>
        </form>

        {/* متن فوتر با لینک فعال */}
        <p style={s.footerText}>
          اگر قبلاً ثبت‌نام کرده‌اید، روی <span style={s.linkText} onClick={() => navigate('/login')}>ورود</span> کلیک کنید.
        </p>
      </div>
    </div>
  );
};

const s = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', direction: 'rtl', backgroundColor: '#1a1a1a' },
  card: { background: '#fff', padding: '30px 40px', borderRadius: '24px', width: '380px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  logoContainer: { marginBottom: '20px' },
  logoImg: { width: '100px', height: 'auto' },
  title: { fontSize: '22px', fontWeight: 'bold', marginBottom: '25px', color: '#111' },
  inputGroup: { textAlign: 'right', marginBottom: '18px' },
  label: { display: 'block', fontSize: '12px', marginBottom: '8px', color: '#666' },
  inputLeft: { 
    width: '100%', 
    padding: '14px', 
    borderRadius: '12px', 
    border: '1px solid #eee', 
    outline: 'none', 
    fontSize: '15px', 
    boxSizing: 'border-box',
    textAlign: 'left',
    direction: 'ltr'
  },
  selectWrapper: { position: 'relative' },
  select: { width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #eee', outline: 'none', appearance: 'none', backgroundColor: '#fff', fontSize: '15px' },
  selectIcon: { position: 'absolute', left: '15px', top: '18px', fontSize: '10px', color: '#aaa' },
  phoneInputContainer: { 
    display: 'flex', 
    border: '1px solid #eee', 
    borderRadius: '12px', 
    overflow: 'hidden', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    flexDirection: 'row' 
  },
  phoneInput: { 
    flex: 1, 
    padding: '14px', 
    border: 'none', 
    outline: 'none', 
    fontSize: '16px', 
    textAlign: 'left', 
    direction: 'ltr' 
  },
  countryCode: { 
    padding: '0 15px', 
    borderRight: '1px solid #eee', 
    color: '#333', 
    fontSize: '14px', 
    backgroundColor: '#fafafa', 
    lineHeight: '50px',
    direction: 'ltr' 
  },
  mainButton: { width: '100%', padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: '#f68910', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  footerText: { fontSize: '12px', color: '#777', marginTop: '20px', lineHeight: '1.6' },
  linkText: { color: '#f68910', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }
};

export default RegisterPage;
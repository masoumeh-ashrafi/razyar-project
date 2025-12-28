import './VerifyPage.css';

import React, { useEffect, useRef, useState } from 'react';

import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const VerifyPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']); 
  const [timer, setTimer] = useState(116); // ۱:۵۶ مطابق تصویر
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  
  // خواندن شماره از حافظه که در مرحله قبل ذخیره کردیم
  const phoneNumber = localStorage.getItem('tempPhone') || '۰۹۹۲۸۷۸۴۸۴۶';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const persianSeconds = seconds < 10 ? `۰${seconds}` : seconds;
    return `${minutes}:${persianSeconds}`;
  };

  const handleChange = (index, value) => {
    // فقط عدد قبول کن
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // حرکت به باکس بعدی اگر پر شد
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // بازگشت به باکس قبلی با Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');

    if (finalOtp.length === 4) {
      console.log("کد تایید شد، انتقال به لیست فروشگاه‌ها...");
      // تغییر مسیر به صفحه Stores
      navigate('/stores'); 
    } else {
      alert("لطفاً کد تایید ۴ رقمی را کامل وارد کنید.");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <div className="logo-container">
          <img src={logoRazy} alt="رازیار" className="logo-img" />
        </div>
        
        <h2 className="verify-title">کد تایید یکبار مصرف</h2>
        
        <div className="verify-info">
          <span>کد تایید ارسال شده به شماره <b className="phone-orange">{phoneNumber}</b> را وارد کنید.</span>
          <span className="edit-icon" onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>✏️</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={inputRefs[index]}
                value={data}
                onInput={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-square"
                autoComplete="off"
              />
            ))}
          </div>

          <button type="submit" className="verify-button">
            تایید کد و ورود به سیستم
          </button>
        </form>

        <div className="resend-timer">
           <span>{formatTime(timer)} تا درخواست مجدد کد</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
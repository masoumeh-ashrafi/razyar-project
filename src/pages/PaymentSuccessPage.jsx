import './PaymentStatus.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="status-page success">
      <div className="status-card">
        <div className="status-icon">✓</div>
        <h1 className="status-title">پرداخت موفقیت‌آمیز</h1>
        <p className="status-desc">اشتراک شما با موفقیت فعال شد. از این پس می‌توانید به تمامی امکانات پنل دسترسی داشته باشید.</p>
        
        <div className="info-box">
          <div className="info-item">
            <span className="info-label">وضعیت:</span>
            <span className="info-value" style={{color: '#16a34a'}}>تایید شده</span>
          </div>
          <div className="info-item">
            <span className="info-label">نوع عملیات:</span>
            <span className="info-value">خرید اشتراک B2B</span>
          </div>
        </div>

        <div className="status-btns">
          <button className="btn-main" onClick={() => navigate('/stores')}>ورود به پنل کاربری</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
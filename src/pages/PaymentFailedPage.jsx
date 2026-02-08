import './PaymentStatus.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="status-page failed">
      <div className="status-card">
        <div className="status-icon">✕</div>
        <h1 className="status-title">پرداخت ناموفق</h1>
        <p className="status-desc">متاسفانه فرآیند پرداخت با خطا مواجه شد. مبلغی از حساب شما کسر نگردیده است.</p>
        
        <div className="info-box">
          <div className="info-item">
            <span className="info-label">علت خطا:</span>
            <span className="info-value" style={{color: '#dc2626'}}>ترمینال غیرفعال است</span>
          </div>
          <div className="info-item">
            <span className="info-label">کد وضعیت:</span>
            <span className="info-value">۳</span>
          </div>
        </div>

        <div className="status-btns">
          <button className="btn-main" onClick={() => navigate('/subscription')}>تلاش مجدد</button>
          <button className="btn-link" onClick={() => navigate('/stores')}>انصراف و بازگشت</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
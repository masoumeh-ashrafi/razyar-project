import "./SubscriptionPage.css";

import React, { useEffect, useMemo, useState } from "react";

import api from "../api/axiosConfigs";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [error, setError] = useState("");

  // تبدیل اعداد به فارسی برای نمایش قیمت و روزها
  const toFaPrice = (n) => parseInt(n).toLocaleString("fa-IR") + " تومان";
  const toFa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/b2b/Subscription/list");
        if (res.data && res.data.status === 1) {
          setPlans(res.data.data);
          // انتخاب پیش‌فرض روی پلن ۱۸۰ روزه (۶ ماهه) مطابق تصویر
          const defaultPlan = res.data.data.find(p => p.durationInDays === 180);
          if (defaultPlan) setSelectedPlanId(defaultPlan.id);
        }
      } catch (e) {
        setError("خطا در بارگذاری لیست پلن‌ها.");
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  const selectedPlan = useMemo(() => 
    plans.find((p) => p.id === selectedPlanId), 
  [plans, selectedPlanId]);

  const handlePayment = async () => {
    if (!selectedPlanId) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.post(`/b2b/Subscription/buy?Id=${selectedPlanId}`);
      if (res.data && res.data.data && res.data.data.url) {
        window.location.href = res.data.data.url;
      } else {
        // نمایش پیام خطا مشابه تصویر در صورت عدم اتصال
        setError("متاسفانه برقراری ارتباط با درگاه بانکی مقدور نیست.");
      }
    } catch (e) {
      setError("متاسفانه برقراری ارتباط با درگاه بانکی مقدور نیست.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sub-page">
      <div className="sub-container">
        {/* هدر سایت مطابق لوگوی تصویر */}
        <header className="sub-header">
          <div className="logo-wrapper">
            <div className="logo-main">RazySoft</div>
            <div className="logo-sub">B2B DASHBOARD</div>
          </div>
          <h1 className="sub-title">انتخاب پلن اشتراک</h1>
          <p className="sub-subtitle">برای دسترسی به امکانات پیشرفته، یکی از اشتراک‌های زیر را انتخاب کنید</p>
        </header>

        {loadingPlans ? (
          <div className="loading-state">در حال بارگذاری پلن‌ها...</div>
        ) : (
          <div className="plans-grid">
            {/* مرتب‌سازی و نمایش کارت‌ها */}
            {[...plans].sort((a, b) => b.durationInDays - a.durationInDays).map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${selectedPlanId === plan.id ? "active" : ""}`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {plan.durationInDays === 180 && <div className="badge-popular">پیشنهادی</div>}
                
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-days">{toFa(plan.durationInDays)} روز دسترسی کامل</p>
                
                <div className="plan-price">
                  <span className="price-num">{toFaPrice(plan.price)}</span>
                </div>

                <ul className="plan-features">
                  <li><span className="check-icon">✓</span> مدیریت تا {toFa(plan.maxStores)} فروشگاه</li>
                  <li><span className="check-icon">✓</span> مشاهده خلاصه فروش و آمار</li>
                  <li><span className="check-icon">✓</span> امکان خروجی گرفتن از گزارش‌ها</li>
                  <li><span className="check-icon">✓</span> آپدیت‌های رایگان نرم‌افزار</li>
                </ul>

                <button className={`select-btn ${selectedPlanId === plan.id ? "selected" : ""}`}>
                  {selectedPlanId === plan.id ? "انتخاب شده" : "انتخاب پلن"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* فوتر نهایی و دکمه پرداخت */}
        <footer className="footer-bar">
          <div className="footer-info">
            {selectedPlan && (
              <p>
                پلن انتخابی: <strong>{selectedPlan.name}</strong> | مبلغ نهایی: <strong>{toFaPrice(selectedPlan.price)}</strong>
              </p>
            )}
          </div>
          <div className="footer-actions">
            <button className="btn-back" onClick={() => navigate(-1)}>بازگشت</button>
            <button className="btn-pay" onClick={handlePayment} disabled={loading || !selectedPlanId}>
              {loading ? "در حال اتصال..." : "تایید و پرداخت آنلاین"}
            </button>
          </div>
          {error && <div className="error-msg-fixed">{error}</div>}
        </footer>
      </div>
    </div>
  );
};

// خروجی پیش‌فرض برای رفع خطای SyntaxError در App.jsx
export default SubscriptionPage;
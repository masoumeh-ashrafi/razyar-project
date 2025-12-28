import './StoresPage.css';

import React from 'react';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StoresPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      {/* هدر بالا - فیکس شده */}
      <header className="top-nav">
        <div className="top-nav-left">
          <div className="user-profile-header">
            <span className="gray-arrow">▼</span>
            <div className="user-info">
              <span className="user-name">سارا محمدی</span>
              <span className="user-phone">۰۹۹۲۸۷۸۴۸۴۶</span>
            </div>
            <div className="avatar-container">
              <img src="https://i.pravatar.cc/100?u=sara" alt="avatar" />
              <div className="status-dot"></div>
            </div>
            <span className="header-icon">🔔</span>
          </div>
        </div>

        <div className="top-nav-center">
          <div className="search-pill">
            <span className="cmd-hint">⌘ F</span>
            <input type="text" placeholder="جست و جو" />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="top-nav-right">
          <div className="breadcrumb">
            <h1>داشبورد</h1>
            <p>پیشخوان / <span className="blue-text">عمده فروشان</span></p>
          </div>
        </div>
      </header>

      <div className="main-layout">
        {/* محتوای سمت چپ (جدول) */}
        <main className="main-content">
          <div className="alert-box">
            <div className="info-icon">!</div>
            <span>یه پیام طولانی قابل استفاده برای اعلان اطلاعیه در داشبورد</span>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div className="table-search">
                <input type="text" placeholder="جستجو" />
                <span>🔍</span>
              </div>
              <div className="table-title">
                <span>لیست مشتریان من</span>
                <span className="orange-text">👥</span>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>عملیات</th>
                  <th>شماره تماس</th>
                  <th>نام فروشگاه‌ها</th>
                  <th><input type="checkbox" /></th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} onClick={() => navigate('/stock')} className="clickable-row">
                    <td><button className="details-btn">نمایش جزییات</button></td>
                    <td className="phone-cell">۰۹۹۲ ۸۷۸ ۴۸۴۶</td>
                    <td className="name-cell">مانتو جردن</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* سایدبار سمت راست - با رعایت دقیق فواصل */}
        <aside className="right-sidebar">
          <div className="sidebar-top">
            <div className="logo-section">
              <img src={logoRazy} alt="logo" className="sidebar-logo" />
            </div>

            <div className="sidebar-search">
              <span className="cmd-key">⌘ F</span>
              <input type="text" placeholder="جستجو" />
              <span>🔍</span>
            </div>

            <nav className="side-menu">
              <div className="menu-group active">
                <div className="menu-item active">
                  <span>▼</span>
                  <span>مشتریان من</span>
                  <span>👥</span>
                </div>
                <div className="sub-menu-item">
                  <span className="blue-dot-active"></span>
                  فروشگاه‌ها
                </div>
              </div>
              <div className="menu-item">
                <span></span>
                <span>تنظیمات</span>
                <span>⚙️</span>
              </div>
            </nav>
          </div>

          <div className="sidebar-bottom">
            <div className="support-card">
              <span className="arrow-left-gray">◀</span>
              <div className="support-info">
                <span className="s-title">پشتیبانی</span>
                <span className="s-desc">هر سوالی داری بپرس!</span>
              </div>
              <div className="orange-box">💬</div>
            </div>

            <div className="profile-combo">
              <span className="gray-arrow">▼</span>
              <div className="combo-info">
                <span className="c-name">پوشاک سارا</span>
                <span className="c-role">تامین کننده</span>
              </div>
              <img src="https://i.pravatar.cc/100?u=shop" alt="shop" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StoresPage;
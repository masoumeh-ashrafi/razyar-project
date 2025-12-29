import './StoresPage.css';

import React, { useState } from 'react';

import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StoresPage = () => {
  const navigate = useNavigate();
  // منطق سرچ
  const [searchTerm, setSearchTerm] = useState('');
  
  const allStores = [
    { id: 1, name: 'مانتو جردن', phone: '۰۹۹۲ ۸۷۸ ۴۸۴۶' },
    { id: 2, name: 'مانتو جردن', phone: '۰۹۹۲ ۸۷۸ ۴۸۴۶' },
    { id: 3, name: 'مانتو جردن', phone: '۰۹۹۲ ۸۷۸ ۴۸۴۶' },
  ];

  const filteredStores = allStores.filter(store => 
    store.name.includes(searchTerm)
  );

  return (
    <div className="dashboard-wrapper-new">
      {/* سایدبار سمت راست - حالا در اولین لایه برای رعایت ترتیب RTL */}
      <aside className="right-sidebar">
        <div className="sidebar-content">
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

            {/* بخش پشتیبانی و پروفایل دقیقاً زیر تنظیمات */}
            <div className="sidebar-bottom-sections">
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
          </nav>
        </div>
      </aside>

      <div className="main-layout-container">
        {/* هدر بالا */}
        <header className="top-nav">
          <div className="top-nav-right">
            <div className="breadcrumb">
              <h1>داشبورد</h1>
              <p>پیشخوان / <span className="blue-text">عمده فروشان</span></p>
            </div>
          </div>

          <div className="top-nav-center">
            <div className="search-pill">
              <span className="cmd-hint">⌘ F</span>
              <input type="text" placeholder="جست و جو" />
              <span className="search-icon">🔍</span>
            </div>
          </div>

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
        </header>

        {/* محتوای اصلی (جدول) */}
        <main className="main-content">
          <div className="alert-box">
            <div className="info-icon">!</div>
            <span>یه پیام طولانی قابل استفاده برای اعلان اطلاعیه در داشبورد</span>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div className="table-title">
                <span className="orange-text">👥</span>
                <span>لیست مشتریان من</span>
              </div>
              <div className="table-search">
                <input 
                  type="text" 
                  placeholder="جستجو" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>🔍</span>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>نام فروشگاه‌ها</th>
                  <th>شماره تماس</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map((store) => (
                  <tr key={store.id} onClick={() => navigate('/stock')} className="clickable-row">
                    <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
                    <td className="name-cell">{store.name}</td>
                    <td className="phone-cell">{store.phone}</td>
                    <td><button className="details-btn">نمایش جزییات</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StoresPage;
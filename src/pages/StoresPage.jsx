import './StoresPage.css';

import {
  Bell,
  ChevronDown,
  ChevronLeft,
  Info,
  MessageCircle,
  Search,
  Settings,
  Store,
  Users
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StoresPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // ۱. استیت پروفایل که در ابتدا خالی است
  const [userData, setUserData] = useState({ 
    FullName: '', 
    Mobile: '', 
    Avatar: '' 
  });

  // ۲. دریافت دیتای زنده از حافظه مرورگر
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserData({
          FullName: parsed.FullName || parsed.fullName || 'کاربر سیستم',
          Mobile: parsed.Mobile || parsed.phoneNumber || '',
          Avatar: parsed.Avatar || parsed.avatar || ''
        });
      } catch (e) {
        console.error("خطا در خواندن اطلاعات کاربر");
      }
    }
  }, []);

  const allStores = [
    { id: 1, name: 'مانتو جردن', phone: '۰۹۹۲ ۸۷۸ ۴۸۴۶' },
    { id: 2, name: 'بوتیک ونک', phone: '۰۹۱۲ ۳۴۵ ۶۷۸۹' },
    { id: 3, name: 'گالری سارینا', phone: '۰۹۳۵ ۷۸۹ ۱۲۳۴' },
  ];

  const filteredStores = allStores.filter(store => 
    store.name.includes(searchTerm)
  );

  // تابع کمکی برای زمانی که عکس کاربر وجود ندارد
  const getAvatar = () => {
    return userData.Avatar || `https://ui-avatars.com/api/?name=${userData.FullName}&background=random`;
  };

  return (
    <div className="dashboard-wrapper" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', direction: 'rtl' }}>
      
      {/* محتوای اصلی (سمت چپ) */}
      <div className="main-layout-container" style={{ flexGrow: 1 }}>
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
              <input 
                type="text" 
                placeholder="جست و جو" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} color="#9ca3af" />
            </div>
          </div>

          <div className="top-nav-left">
            <div className="user-profile-header">
              <ChevronDown size={16} color="#9ca3af" />
              <div className="user-info">
                {/* نام و شماره واقعی از localStorage */}
                <span className="user-name">{userData.FullName}</span>
                <span className="user-phone">{userData.Mobile}</span>
              </div>
              <div className="avatar-container">
                <img src={getAvatar()} alt="avatar" />
                <div className="status-dot"></div>
              </div>
              <Bell size={20} color="#4b5563" className="header-icon" />
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="alert-box" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', backgroundColor: '#eff6ff', borderRadius: '12px', color: '#3b82f6', marginBottom: '20px', borderRight: '5px solid #3b82f6' }}>
            <div className="info-icon-container" style={{ backgroundColor: '#3b82f6', borderRadius: '50%', padding: '4px', display: 'flex' }}>
              <Info size={16} color="white" />
            </div>
            <span style={{ fontWeight: '500' }}>یه پیام طولانی قابل استفاده برای اعلان اطلاعیه در داشبورد</span>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div className="table-title">
                <Users size={20} color="#f97316" />
                <span>لیست مشتریان من</span>
              </div>
              <div className="table-search-box">
                <input 
                  type="text" 
                  placeholder="جستجو" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} color="#9ca3af" />
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th><input type="checkbox" className="custom-checkbox" /></th>
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

      {/* سایدبار (سمت راست) */}
      <aside className="right-sidebar" style={{ width: '280px', flexShrink: 0 }}>
        <div className="sidebar-content">
          <div className="logo-section">
            <img src={logoRazy} alt="logo" className="sidebar-logo" />
          </div>

          <div className="sidebar-search">
            <span className="cmd-key">⌘ F</span>
            <input 
              type="text" 
              placeholder="جستجو" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} color="#9ca3af" />
          </div>

          <nav className="side-menu">
            <div className="menu-group active">
              <div className="menu-item active">
                <ChevronDown size={16} />
                <span>مشتریان من</span>
                <Users size={20} />
              </div>
              <div className="sub-menu-item">
                <span className="blue-dot-active"></span>
                فروشگاه‌ها
              </div>
            </div>
            
            <div className="menu-item" onClick={() => navigate('/stock')}>
               <span style={{width: '16px'}}></span>
               <span>انبار من</span>
               <Store size={20} />
            </div>

            <div className="sidebar-bottom-sections" style={{ marginTop: 'auto' }}>
              <div className="support-card">
                <ChevronLeft size={16} color="#9ca3af" />
                <div className="support-info">
                  <span className="s-title">پشتیبانی</span>
                  <span className="s-desc">هر سوالی داری بپرس!</span>
                </div>
                <div className="orange-box">
                  <MessageCircle size={18} color="white" />
                </div>
              </div>

              <div className="profile-combo">
                <ChevronDown size={16} color="#9ca3af" />
                <div className="combo-info">
                  {/* نام واقعی در سایدبار */}
                  <span className="c-name">{userData.FullName}</span>
                  <span className="c-role">تامین کننده</span>
                </div>
                <img src={getAvatar()} alt="shop" className="profile-img" />
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default StoresPage;
import './StoresPage.css';

import {
  Bell,
  ChevronDown,
  Search,
  Users
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StoresPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [userData, setUserData] = useState({ 
    FullName: '', 
    Mobile: '', 
    Avatar: '' 
  });

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
              {/* متن زیر داشبورد طبق درخواست حذف شد */}
            </div>
          </div>

          {/* باکس جستجوی وسط هدر طبق درخواست حذف شد */}
          <div className="top-nav-center"></div>

          <div className="top-nav-left">
            <div className="user-profile-header">
              <ChevronDown size={16} color="#9ca3af" />
              <div className="user-info">
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
          {/* باکس پیام آبی رنگ طبق درخواست حذف شد */}

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
          <div className="logo-section" style={{ marginBottom: '40px' }}>
            <img src={logoRazy} alt="logo" className="sidebar-logo" />
          </div>

          {/* جستجوی سایدبار طبق درخواست حذف شد */}

          <nav className="side-menu">
            <div className="menu-group active">
              <div className="menu-item active">
                {/* Chevron حذف نشد تا استایل حفظ شود، اما زیرمنوها حذف شدند */}
                <ChevronDown size={16} />
                <span>مشتریان من</span>
                <Users size={20} />
              </div>
            </div>
            
            {/* گزینه‌های انبار من و فروشگاه‌ها طبق درخواست حذف شدند */}

            <div className="sidebar-bottom-sections" style={{ marginTop: 'auto' }}>
              {/* بخش پشتیبانی و پروفایل پایین سایدبار طبق درخواست حذف شدند */}
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default StoresPage;
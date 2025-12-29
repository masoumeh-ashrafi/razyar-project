import './StockPage.css';

import {
  Bell,
  ChevronDown,
  ChevronLeft,
  Info,
  LayoutDashboard,
  MessageCircle,
  Package,
  Search,
  Settings,
  Users
} from 'lucide-react';
import React, { useState } from 'react';

import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const mockData = [
  { id: 14, name: 'مانتو جردن', stock: 12 },
  { id: 15, name: 'مانتو عبایی', stock: 0 },
  { id: 16, name: 'کت زنانه', stock: 4 },
  { id: 17, name: 'شومیز نخی', stock: 0 },
  { id: 18, name: 'پالتو زمستانی', stock: 20 },
  { id: 19, name: 'مانتو کتی', stock: 1 },
];

const StockPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredData = mockData.filter(item =>
    item.name.includes(searchTerm) || item.id.toString().includes(searchTerm)
  );

  return (
    <div className="dashboard-wrapper">
      {/* سایدبار سمت راست */}
      <aside className="right-sidebar">
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
              <div className="menu-item" onClick={() => navigate('/stores')}>
                <ChevronLeft size={16} />
                <span>مشتریان من</span>
                <Users size={20} />
              </div>
              <div className="sub-menu-item">
                <span className="blue-dot-active"></span>
                انبار من (موجودی)
              </div>
            </div>
            
            <div className="menu-item">
              <span style={{width: '16px'}}></span>
              <span>تنظیمات</span>
              <Settings size={20} />
            </div>

            <div className="sidebar-bottom-sections">
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
                  <span className="c-name">پوشاک سارا</span>
                  <span className="c-role">تامین کننده</span>
                </div>
                <img src="https://i.pravatar.cc/100?u=shop" alt="shop" className="profile-img" />
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <div className="main-layout-container">
        <header className="top-nav">
          <div className="top-nav-right">
            <div className="breadcrumb">
              <h1>داشبورد</h1>
              <p>پیشخوان / <span className="blue-text">موجودی کالا</span></p>
            </div>
          </div>

          <div className="top-nav-center">
            <div className="search-pill">
              <span className="cmd-hint">⌘ F</span>
              <input 
                type="text" 
                placeholder="جست و جو در کالاها..." 
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
                <span className="user-name">سارا محمدی</span>
                <span className="user-phone">۰۹۹۲۸۷۸۴۸۴۶</span>
              </div>
              <div className="avatar-container">
                <img src="https://i.pravatar.cc/100?u=sara" alt="avatar" />
                <div className="status-dot"></div>
              </div>
              <Bell size={20} color="#4b5563" className="header-icon" />
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="alert-box info-variant">
            <div className="info-icon-container blue-bg">
              <Info size={16} color="white" />
            </div>
            <span>این یک پیام سیستم برای اطلاع‌رسانی وضعیت انبار است.</span>
          </div>

          <div className="table-card">
            <div className="table-header">
              <div className="table-title">
                <Package size={20} color="#f97316" />
                <span>لیست موجودی انبار</span>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th style={{width: '50px', textAlign: 'center'}}><input type="checkbox" /></th>
                  <th>کد کالا</th>
                  <th>نام کالا</th>
                  <th style={{textAlign: 'left'}}>تعداد موجودی</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="clickable-row">
                    <td style={{textAlign: 'center'}}><input type="checkbox" /></td>
                    <td className="code-cell">#{item.id}</td>
                    <td className="name-cell">{item.name}</td>
                    <td className={`stock-cell ${item.stock === 0 ? 'out-of-stock' : ''}`} style={{textAlign: 'left'}}>
                      {item.stock === 0 ? 'تمام شد' : item.stock}
                    </td>
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

export default StockPage;
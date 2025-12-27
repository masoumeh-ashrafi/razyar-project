import './StockPage.css';

import {
  FiBell,
  FiChevronDown,
  FiHome,
  FiInfo,
  FiPackage,
  FiSearch,
  FiSettings,
  FiUsers
} from 'react-icons/fi';
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

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredData = mockData.filter(item =>
    item.name.includes(searchTerm)
  );

  return (
    <div className="page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-area">
          <img src={logoRazy} alt="Razy" className="logo-img" />
        </div>
        <div className="sidebar-search">
          <FiSearch size={16} color="#9CA3AF" />
          <input placeholder="جستجو" className="sidebar-input" />
        </div>
        <nav style={{ flex: 1 }}>
          <div className="nav-item" onClick={() => navigate('/stores')}>
            <FiHome className="nav-icon" /> پیشخوان
          </div>
          <div className="nav-item-active">
            <FiPackage className="nav-icon" /> انبار من
          </div>
          <div className="nav-item">
            <FiUsers className="nav-icon" /> مشتریان
          </div>
          <div className="nav-item">
            <FiSettings className="nav-icon" /> تنظیمات
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="user-box">
             <FiChevronDown color="#9CA3AF" />
             <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>سارا محمدی</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>۰۹۹۲۸۷۸۴۸۴۶</div>
             </div>
             <div className="avatar-main">
                <span className="online-dot" />
             </div>
             <FiBell size={22} color="#9CA3AF" />
          </div>

          <div className="main-search">
            <FiSearch size={18} color="#9CA3AF" />
            <input
              placeholder="جستجو کالا..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="main-search-input"
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <h2 style={{ margin: 0 }}>داشبورد</h2>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>پیشخوان / عمده فروشان</div>
          </div>
        </header>

        <div className="info-alert">
           <FiInfo style={{ marginLeft: '10px' }} size={18} />
           این یک پیام سیستم برای اطلاع‌رسانی وضعیت انبار است.
        </div>

        <div className="card">
          <table className="table-main">
            <thead>
              <tr>
                <th className="th-style">تعداد موجودی</th>
                <th className="th-style">نام کالا</th>
                <th className="th-style">کد کالا</th>
                <th className="th-style"><input type="checkbox" /></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td className="td-style" style={{ 
                    color: item.stock === 0 ? '#DC2626' : '#111',
                    fontWeight: item.stock === 0 ? 'bold' : '500' 
                  }}>
                    {item.stock === 0 ? 'تمام شد' : item.stock}
                  </td>
                  <td className="td-style">{item.name}</td>
                  <td className="td-style">#{item.id}</td>
                  <td className="td-style"><input type="checkbox" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
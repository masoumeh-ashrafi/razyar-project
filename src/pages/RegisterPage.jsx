import './StoresPage.css'; // ایمپورت استایل‌های جدا شده

import { FiBell, FiChevronDown, FiHome, FiSearch, FiSettings, FiShoppingBag, FiUsers } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const fallbackData = [
    { id: 1, name: "مانتو جردن (تستی)", phone: "۰۹۱۲۸۸۸۴۸۴۹" },
    { id: 2, name: "پوشاک ونک (تستی)", phone: "۰۹۳۵۷۷۷۶۶۵۵" },
    { id: 3, name: "مزون بهار (تستی)", phone: "۰۹۱۲۱۱۱۲۲۳۳" }
  ];

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/b2b/Commodity/Stores', {
          headers: { 'AppToken': token }
        });
        if (response.data && (response.data.data || Array.isArray(response.data))) {
          const finalData = response.data.data || response.data;
          setStores(finalData.length > 0 ? finalData : fallbackData);
        } else {
          setStores(fallbackData);
        }
      } catch (err) {
        setStores(fallbackData);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => 
    store.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    store.phone?.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage) || 1;
  const currentItems = filteredStores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="stores-layout">
      <aside className="stores-sidebar">
        <div className="stores-logo-area">
          <img src={logoRazy} alt="رازی" className="stores-logo-img" />
        </div>

        <div className="sidebar-search-wrapper">
          <div className="sidebar-search-box">
            <FiSearch className="search-icon-sidebar" />
            <input type="text" placeholder="جستجو در منو" className="input-bare" />
            <span className="command-key">⌘ F</span>
          </div>
        </div>

        <nav className="stores-nav">
          <div className="nav-item"><FiHome className="nav-icon" /> پیشخوان</div>
          <div className="nav-item-active"><FiUsers className="nav-icon" /> مشتریان من</div>
          <div className="nav-item"><FiShoppingBag className="nav-icon" /> فروشگاه‌ها</div>
          <div className="nav-item"><FiSettings className="nav-icon" /> تنظیمات</div>
        </nav>

        <div className="profile-card">
          <FiChevronDown style={{color: '#94A3B8'}} />
          <div className="profile-text">
            <div className="profile-name">پوشاک سارا</div>
            <div className="profile-role">تامین کننده</div>
          </div>
          <img src="https://i.pravatar.cc/150?u=sara2" alt="avatar" className="profile-avatar" />
        </div>
      </aside>

      <main className="stores-main">
        <header className="stores-header">
          <div>
            <h1 className="page-title">لیست مشتریان من</h1>
            <div className="breadcrumb">پیشخوان / عمده فروشان</div>
          </div>
          <div className="header-left-actions">
            <div className="top-search-bar">
               <FiSearch style={{color: '#94A3B8'}} />
               <input 
                 type="text" 
                 placeholder="جستجو..." 
                 className="input-bare"
                 value={searchTerm}
                 onChange={(e) => {
                   setSearchTerm(e.target.value);
                   setCurrentPage(1);
                 }}
               />
            </div>
            <div className="notif-badge">
              <FiBell />
              <span className="notif-dot"></span>
            </div>
          </div>
        </header>

        <div className="stores-table-card">
          <div className="card-head">📌 لیست مشتریان</div>
          <table className="stores-table">
            <thead>
              <tr>
                <th className="stores-th">عملیات</th>
                <th className="stores-th">شماره تماس</th>
                <th className="stores-th">نام فروشگاه‌ها</th>
                <th className="stores-th"><input type="checkbox" /></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((store, index) => (
                <tr key={store.id || index} className="stores-tr" onClick={() => navigate('/stock')}>
                  <td className="stores-td">
                    <button 
                      className="btn-detail" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/stock');
                      }}
                    >
                      نمایش جزئیات
                    </button>
                  </td>
                  <td className="stores-td">{store.phone}</td>
                  <td className="stores-td">{store.name}</td>
                  <td className="stores-td" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="stores-pager">
             <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p-1)} className="pager-btn">بعدی</button>
             <span className="page-info">صفحه {currentPage} از {totalPages}</span>
             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p+1)} className="pager-btn">قبلی</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoresPage;
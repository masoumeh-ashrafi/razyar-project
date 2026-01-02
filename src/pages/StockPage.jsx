import './StockPage.css';

import { Bell, ChevronDown, ChevronLeft, MessageCircle, Package, Search, Settings, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const rawUser = localStorage.getItem('user');
  const userData = rawUser ? JSON.parse(rawUser) : {
    FullName: 'کاربر سیستم',
    Mobile: '---',
    Avatar: ''
  };

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const response = await api.get('/b2b/Commodity/Stock');
        const actualData = response.data?.data || response.data || [];
        setStockData(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error("خطا در دریافت لیست انبار:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  const filteredData = stockData.filter(item => {
    const name = (item.CmFullName || '').toLowerCase();
    const barcode = (item.Barcode || '').toString();
    return name.includes(searchTerm.toLowerCase()) || barcode.includes(searchTerm);
  });

  return (
    <div className="dashboard-wrapper" style={{ direction: 'rtl', display: 'flex', backgroundColor: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* سایدبار ثابت راست */}
      <aside className="right-sidebar" style={{ width: '280px', backgroundColor: '#fff', borderLeft: '1px solid #f0f0f0', position: 'fixed', right: 0, top: 0, bottom: 0, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src={logoRazy} alt="logo" style={{ width: '130px' }} />
          </div>

          <nav>
            <div onClick={() => navigate('/stores')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#64748b', cursor: 'pointer', marginBottom: '8px' }}>
              <Users size={20} />
              <span>مشتریان من</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fff7ed', borderRadius: '12px', color: '#f97316' }}>
              <Settings size={20} />
              <span style={{ fontWeight: 'bold' }}>انبار من (موجودی)</span>
            </div>
          </nav>
        </div>

        <div style={{ marginTop: 'auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '16px', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '10px' }}><MessageCircle size={20} color="#3b82f6" /></div>
            <div style={{ flexGrow: 1 }}><div style={{ fontWeight: 'bold', fontSize: '13px' }}>پشتیبانی</div></div>
            <ChevronLeft size={16} color="#cbd5e1" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={userData.Avatar || "https://via.placeholder.com/40"} style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }} alt="profile" />
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{userData.FullName}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>تامین کننده</div>
            </div>
          </div>
        </div>
      </aside>

      {/* محتوای اصلی با قابلیت اسکرول */}
      <div style={{ marginRight: '280px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 999 }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>موجودی کالا</h1>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>پیشخوان / <span style={{ color: '#3b82f6' }}>لیست انبار</span></div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', width: '380px' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', right: '16px', top: '12px' }} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`جستجو در بین ${stockData.length} کالا...`} 
                style={{ width: '100%', padding: '10px 48px 10px 15px', borderRadius: '24px', border: 'none', backgroundColor: '#f1f5f9' }} 
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{userData.FullName}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{userData.Mobile}</div>
              </div>
              <img src={userData.Avatar || "https://via.placeholder.com/40"} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="avatar" />
            </div>
            <Bell size={22} color="#64748b" />
          </div>
        </header>

        <main style={{ padding: '32px 40px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Package size={22} color="#f97316" />
              <span style={{ fontWeight: 'bold' }}>لیست موجودی انبار ({stockData.length})</span>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
              <thead style={{ backgroundColor: '#fcfcfc' }}>
                <tr>
                  <th style={{ width: '50px', padding: '16px 32px', textAlign: 'center' }}><input type="checkbox" /></th>
                  <th style={{ padding: '16px 32px', color: '#94a3b8', fontSize: '13px' }}>بارکد کالا</th>
                  <th style={{ padding: '16px 32px', color: '#94a3b8', fontSize: '13px' }}>نام کالا</th>
                  <th style={{ padding: '16px 32px', color: '#94a3b8', fontSize: '13px', textAlign: 'center' }}>تعداد موجودی</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '60px' }}>در حال بارگذاری کالاها...</td></tr>
                ) : filteredData.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '20px 32px', textAlign: 'center' }}><input type="checkbox" /></td>
                    <td style={{ padding: '20px 32px', color: '#64748b' }}>#{item.Barcode || (index + 1)}</td>
                    <td style={{ padding: '20px 32px', fontWeight: '500' }}>{item.CmFullName || "نامشخص"}</td>
                    <td style={{ padding: '20px 32px', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '6px', 
                        backgroundColor: (item.Sell ?? 0) === 0 ? '#fef2f2' : '#f0fdf4',
                        color: (item.Sell ?? 0) === 0 ? '#ef4444' : '#22c55e',
                        fontWeight: 'bold'
                      }}>
                        {(item.Sell ?? 0) === 0 ? 'ناموجود' : `${item.Sell} عدد`}
                      </span>
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
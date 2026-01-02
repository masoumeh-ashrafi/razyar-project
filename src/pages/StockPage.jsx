import './StockPage.css';

import { Bell, ChevronDown, ChevronLeft, Filter, Info, MessageCircle, Package, Search, Settings, Store, Users } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        console.error("خطا در بارگذاری پروفایل");
      }
    }

    const fetchStock = async () => {
      try {
        setLoading(true);
        const response = await api.get('/b2b/Commodity/Stock');
        const actualData = response.data?.data || response.data?.Data || response.data || [];
        setStockData(Array.isArray(actualData) ? actualData : []);
      } catch (err) {
        console.error("خطا در دریافت لیست انبار:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  const filteredData = useMemo(() => {
    return stockData.filter(item => {
      const name = (item.Name || item.CommodityName || item.CmFullName || '').toLowerCase();
      const barcode = (item.Barcode || item.Code || '').toString();
      const searchLower = searchTerm.toLowerCase();
      return name.includes(searchLower) || barcode.includes(searchLower);
    });
  }, [searchTerm, stockData]);

  const handleImageError = (e) => {
    e.target.src = "https://ui-avatars.com/api/?name=" + (userData.FullName || 'User') + "&background=random";
  };

  return (
    <div className="dashboard-container" style={{ direction: 'rtl', display: 'flex', backgroundColor: '#fcfcfc', height: '100vh', overflow: 'hidden', fontFamily: 'Tahoma' }}>
      
      {/* سایدبار ثابت راست */}
      <aside className="right-sidebar" style={{ width: '280px', backgroundColor: '#fff', borderLeft: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src={logoRazy} alt="logo" style={{ width: '130px' }} />
          </div>

          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '10px' }} />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی سریع..." 
              style={{ width: '100%', padding: '8px 35px 8px 10px', borderRadius: '10px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', fontSize: '12px', outline: 'none' }}
            />
          </div>

          <nav>
            <div onClick={() => navigate('/stores')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#64748b', cursor: 'pointer', marginBottom: '4px' }}>
              <Users size={20} />
              <span>مشتریان من</span>
            </div>

            <div onClick={() => navigate('/all-stores')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#64748b', cursor: 'pointer', marginBottom: '4px' }}>
              <Store size={20} />
              <span>فروشگاه‌ها</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fff7ed', borderRadius: '12px', color: '#f97316' }}>
              <Settings size={20} />
              <span style={{ fontWeight: 'bold' }}>انبار من (موجودی)</span>
            </div>
          </nav>
        </div>

        <div style={{ marginTop: 'auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '16px', marginBottom: '15px', cursor: 'pointer' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '10px' }}><MessageCircle size={20} color="#3b82f6" /></div>
            <div style={{ flexGrow: 1 }}><div style={{ fontWeight: 'bold', fontSize: '13px' }}>پشتیبانی</div></div>
            <ChevronLeft size={16} color="#cbd5e1" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
                src={userData.Avatar || "https://via.placeholder.com/44"} 
                onError={handleImageError}
                style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }} 
                alt="profile" 
            />
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{userData.FullName}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>تامین کننده</div>
            </div>
            <ChevronDown size={16} color="#cbd5e1" />
          </div>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' }}>
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
                style={{ width: '100%', padding: '10px 48px 10px 15px', borderRadius: '24px', border: 'none', backgroundColor: '#f1f5f9', outline: 'none' }} 
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{userData.FullName}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{userData.Mobile}</div>
              </div>
              <img 
                src={userData.Avatar || "https://via.placeholder.com/40"} 
                onError={handleImageError}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                alt="avatar" 
              />
            </div>
            <Bell size={22} color="#64748b" />
          </div>
        </header>

        <main style={{ padding: '32px 40px', overflowY: 'auto', flexGrow: 1 }}>
          
          {/* نوار آبی اعلان که اضافه شد */}
          <div className="alert-box" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '15px', 
            backgroundColor: '#eff6ff', 
            borderRadius: '12px', 
            color: '#3b82f6', 
            marginBottom: '24px', 
            borderRight: '5px solid #3b82f6' 
          }}>
            <div style={{ backgroundColor: '#3b82f6', borderRadius: '50%', padding: '4px', display: 'flex' }}>
              <Info size={16} color="white" />
            </div>
            <span style={{ fontWeight: '500' }}>یه پیام طولانی قابل استفاده برای اعلان اطلاعیه در داشبورد</span>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Package size={22} color="#f97316" />
                <span style={{ fontWeight: 'bold' }}>لیست موجودی انبار</span>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                نمایش {filteredData.length} کالا از مجموع {stockData.length}
              </div>
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
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '60px' }}>در حال بارگذاری...</td></tr>
                ) : filteredData.length > 0 ? filteredData.map((item, index) => {
                  const itemName = item.Name || item.CommodityName || item.CmFullName || "نامشخص";
                  const itemBarcode = item.Barcode || item.Code || (index + 1);
                  const stockValue = item.Sell ?? item.Stock ?? item.Quantity ?? 0;

                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '20px 32px', textAlign: 'center' }}><input type="checkbox" /></td>
                      <td style={{ padding: '20px 32px', color: '#64748b' }}>#{itemBarcode}</td>
                      <td style={{ padding: '20px 32px', fontWeight: '500' }}>{itemName}</td>
                      <td style={{ padding: '20px 32px', textAlign: 'center' }}>
                        <span style={{ 
                          padding: '4px 12px', 
                          borderRadius: '6px', 
                          backgroundColor: stockValue === 0 ? '#fef2f2' : '#f0fdf4',
                          color: stockValue === 0 ? '#ef4444' : '#22c55e',
                          fontWeight: 'bold'
                        }}>
                          {stockValue === 0 ? 'ناموجود' : `${stockValue} عدد`}
                        </span>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>کالایی با این مشخصات یافت نشد.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockPage;
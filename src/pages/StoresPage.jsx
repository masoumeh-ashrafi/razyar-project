import './StoresPage.css';

import { Bell, ChevronDown, ChevronLeft, Info, MessageCircle, Search, Settings, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StoresPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // مشخصات سارا محمدی دقیقاً طبق طرح فیگما
  const userData = {
    FullName: 'سارا محمدی',
    Mobile: '۰۹۹۲۸۷۸۴۸۴۶',
    Avatar: 'https://i.pravatar.cc/100?u=sara' 
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await api.get('/b2b/Commodity/Stores');
        // استخراج دیتا از ساختار پاسخ
        const data = response.data?.data || response.data || [];
        setStores(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("خطا در دریافت لیست فروشگاه‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => {
    // جستجوی هوشمند در نام مشتری یا نام فروشگاه
    const name = (store.Customer?.CmFullName || store.CmFullName || '').toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="dashboard-wrapper" style={{ direction: 'rtl', display: 'flex', backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: 'Tahoma' }}>
      
      {/* سایدبار راست - فیکس شده مطابق فیگما */}
      <aside className="right-sidebar" style={{ width: '280px', backgroundColor: '#fff', borderLeft: '1px solid #f0f0f0', position: 'fixed', right: 0, height: '100vh', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src={logoRazy} alt="logo" style={{ width: '130px' }} />
          </div>

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '10px' }} />
            <input type="text" placeholder="جستجو" style={{ width: '100%', padding: '8px 35px 8px 10px', borderRadius: '10px', border: '1px solid #eee', backgroundColor: '#fafafa', fontSize: '13px' }} />
            <span style={{ position: 'absolute', left: '10px', top: '8px', fontSize: '10px', color: '#94a3b8', border: '1px solid #eee', padding: '2px 4px', borderRadius: '4px' }}>⌘ F</span>
          </div>

          <nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#fff7ed', borderRadius: '12px', color: '#f97316', marginBottom: '8px' }}>
              <Users size={20} />
              <span style={{ fontWeight: 'bold' }}>مشتریان من</span>
            </div>
            <div style={{ paddingRight: '44px', color: '#f97316', fontSize: '13px', marginBottom: '16px' }}>• لیست فروشگاه‌ها</div>
            
            <div onClick={() => navigate('/stock')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', color: '#64748b', cursor: 'pointer' }}>
              <Settings size={20} />
              <span>انبار من (موجودی)</span>
            </div>
          </nav>
        </div>

        {/* پروفایل سارا محمدی پایین سایدبار */}
        <div style={{ marginTop: 'auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '16px', marginBottom: '15px' }}>
            <div style={{ backgroundColor: '#eff6ff', padding: '8px', borderRadius: '10px' }}><MessageCircle size={20} color="#3b82f6" /></div>
            <div style={{ flexGrow: 1 }}><div style={{ fontWeight: 'bold', fontSize: '13px' }}>پشتیبانی</div><div style={{ fontSize: '11px', color: '#94a3b8' }}>سوال بپرسید!</div></div>
            <ChevronLeft size={16} color="#cbd5e1" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={userData.Avatar} style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flexGrow: 1 }}><div style={{ fontWeight: 'bold', fontSize: '14px' }}>{userData.FullName}</div><div style={{ fontSize: '11px', color: '#94a3b8' }}>تامین کننده</div></div>
            <ChevronDown size={16} color="#cbd5e1" />
          </div>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <div style={{ marginRight: '280px', flexGrow: 1 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>داشبورد</h1>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>پیشخوان / <span style={{ color: '#3b82f6' }}>مشتریان من</span></div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', width: '380px' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', right: '16px', top: '12px' }} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو بین مشتریان..." 
                style={{ width: '100%', padding: '10px 48px 10px 15px', borderRadius: '24px', border: 'none', backgroundColor: '#f1f5f9' }} 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{userData.FullName}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{userData.Mobile}</div>
              </div>
              <img src={userData.Avatar} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #3b82f6' }} />
            </div>
          </div>
        </header>

        <main style={{ padding: '32px 40px' }}>
          <div className="table-card" style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users size={22} color="#f97316" />
              <span style={{ fontWeight: 'bold' }}>لیست مشتریان من ({stores.length})</span>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
              <thead>
                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <th style={{ padding: '16px 32px', color: '#94a3b8', fontSize: '13px' }}>نام فروشگاه</th>
                  <th style={{ padding: '16px 32px', color: '#94a3b8', fontSize: '13px' }}>شماره تماس</th>
                  <th style={{ padding: '16px 32px', color: '#94a3b8', fontSize: '13px', textAlign: 'center' }}>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '60px' }}>در حال دریافت دیتا...</td></tr>
                ) : filteredStores.map((store, index) => {
                  // پیدا کردن نام فروشگاه از لایه‌های مختلف دیتا
                  const storeName = store.Customer?.CmFullName || store.CmFullName || store.Name || "نامشخص";
                  const storePhone = store.Customer?.Mobile || store.PhoneNumber || "---";

                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '20px 32px', fontWeight: '500' }}>{storeName}</td>
                      <td style={{ padding: '20px 32px', color: '#64748b' }}>{storePhone}</td>
                      <td style={{ padding: '20px 32px', textAlign: 'center' }}>
                        <button 
                          onClick={() => navigate('/stock')}
                          style={{ padding: '8px 24px', backgroundColor: '#fff7ed', color: '#f97316', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          نمایش موجودی
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StoresPage;
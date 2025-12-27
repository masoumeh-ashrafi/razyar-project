import { FiBell, FiChevronDown, FiHome, FiSearch, FiSettings, FiShoppingBag, FiUsers } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';

import api from '../api/axiosConfigs';
import logoRazy from '../assets/RazyLogo.png';
import { useNavigate } from 'react-router-dom';

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // ۱. اضافه کردن State برای متن جستجو
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

  // ۲. فیلتر کردن لیست بر اساس نام یا شماره تماس
  const filteredStores = stores.filter(store => 
    store.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    store.phone?.includes(searchTerm)
  );

  // ۳. آپدیت کردن محاسبات پجینیشن بر اساس لیست فیلتر شده
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage) || 1;
  const currentItems = filteredStores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={s.layout}>
      <aside style={s.sidebar}>
        <div style={s.logoArea}>
          <img src={logoRazy} alt="رازی" style={s.logoImg} />
        </div>

        <div style={s.sidebarSearchWrapper}>
          <div style={s.searchBox}>
            <FiSearch style={s.searchIcon} />
            <input 
              type="text" 
              placeholder="جستجو در منو" 
              style={s.inputBare} 
            />
            <span style={s.commandKey}>⌘ F</span>
          </div>
        </div>

        <nav style={s.nav}>
          <div style={s.navItem}><FiHome style={s.navIcon} /> پیشخوان</div>
          <div style={s.navItemActive}><FiUsers style={s.navIcon} /> مشتریان من</div>
          <div style={s.navItem}><FiShoppingBag style={s.navIcon} /> فروشگاه‌ها</div>
          <div style={s.navItem}><FiSettings style={s.navIcon} /> تنظیمات</div>
        </nav>

        <div style={s.profileCard}>
          <FiChevronDown style={s.arrowIcon} />
          <div style={s.profileText}>
            <div style={s.profileName}>پوشاک سارا</div>
            <div style={s.profileRole}>تامین کننده</div>
          </div>
          <img src="https://i.pravatar.cc/150?u=sara2" alt="avatar" style={s.avatar} />
        </div>
      </aside>

      <main style={s.main}>
        <header style={s.header}>
          <div style={s.headerRight}>
            <h1 style={s.pageTitle}>لیست مشتریان من</h1>
            <div style={s.breadcrumb}>پیشخوان / عمده فروشان</div>
          </div>
          <div style={s.headerLeft}>
            {/* ۴. وصل کردن باکس جستجوی هدر به فیلتر لیست */}
            <div style={s.topSearch}>
               <FiSearch style={s.iconGrey} />
               <input 
                 type="text" 
                 placeholder="جستجو..." 
                 style={s.inputBare} 
                 value={searchTerm}
                 onChange={(e) => {
                   setSearchTerm(e.target.value);
                   setCurrentPage(1); // برگشت به صفحه اول هنگام جستجو
                 }}
               />
            </div>
            <div style={s.notifBadge}>
              <FiBell />
              <span style={s.dot}></span>
            </div>
          </div>
        </header>

        <div style={s.card}>
          <div style={s.cardHead}>📌 لیست مشتریان</div>
          <table style={s.table}>
            <thead>
              <tr style={s.thRow}>
                <th style={s.th}>عملیات</th>
                <th style={s.th}>شماره تماس</th>
                <th style={s.th}>نام فروشگاه‌ها</th>
                <th style={s.th}><input type="checkbox" /></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((store, index) => (
                <tr 
                  key={store.id || index} 
                  style={s.tr} 
                  onClick={() => navigate('/stock')} 
                >
                  <td style={s.td}>
                    <button 
                      style={s.btnDetail} 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/stock');
                      }}
                    >
                      نمایش جزئیات
                    </button>
                  </td>
                  <td style={s.td}>{store.phone}</td>
                  <td style={s.td}>{store.name}</td>
                  <td style={s.td} onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={s.pager}>
             <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p-1)} style={s.pBtn}>بعدی</button>
             <span style={s.pageInfo}>صفحه {currentPage} از {totalPages}</span>
             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p+1)} style={s.pBtn}>قبلی</button>
          </div>
        </div>
      </main>
    </div>
  );
};

// همان استایل‌های قبلی شما بدون تغییر
const s = {
  layout: { display: 'flex', height: '100vh', direction: 'rtl', backgroundColor: '#F8FAFC', fontFamily: 'Vazir, Tahoma' },
  sidebar: { width: '260px', backgroundColor: '#fff', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', padding: '24px 16px' },
  logoArea: { textAlign: 'center', marginBottom: '32px' },
  logoImg: { width: '80px', height: 'auto' },
  sidebarSearchWrapper: { marginBottom: '24px' },
  searchBox: { display: 'flex', alignItems: 'center', backgroundColor: '#F1F5F9', padding: '8px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' },
  searchIcon: { color: '#94A3B8', marginLeft: '8px' },
  commandKey: { backgroundColor: '#fff', border: '1px solid #E2E8F0', padding: '2px 6px', borderRadius: '6px', fontSize: '10px', color: '#94A3B8' },
  inputBare: { border: 'none', background: 'none', outline: 'none', fontSize: '13px', width: '100%', color: '#1E293B' },
  nav: { flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', padding: '12px', color: '#64748B', cursor: 'pointer', borderRadius: '12px', marginBottom: '4px', fontSize: '14px' },
  navItemActive: { display: 'flex', alignItems: 'center', padding: '12px', backgroundColor: '#F0F7FF', color: '#0052cc', fontWeight: 'bold', borderRadius: '12px', marginBottom: '4px', fontSize: '14px' },
  navIcon: { marginLeft: '12px', fontSize: '18px' },
  profileCard: { display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '16px', cursor: 'pointer', marginTop: 'auto' },
  avatar: { width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' },
  profileText: { flex: 1, marginRight: '12px', textAlign: 'right' },
  profileName: { fontSize: '13px', fontWeight: 'bold', color: '#1E293B' },
  profileRole: { fontSize: '11px', color: '#94A3B8' },
  arrowIcon: { color: '#94A3B8' },
  main: { flex: 1, padding: '32px', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  pageTitle: { fontSize: '20px', fontWeight: 'bold', margin: 0 },
  breadcrumb: { fontSize: '12px', color: '#0052cc', marginTop: '4px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  topSearch: { display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: '12px', width: '200px' },
  notifBadge: { position: 'relative', padding: '10px', backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', color: '#64748B', cursor: 'pointer' },
  dot: { position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: '#F68910', borderRadius: '50%', border: '2px solid #fff' },
  card: { background: '#fff', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '24px' },
  cardHead: { fontWeight: 'bold', marginBottom: '20px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'right', padding: '12px', color: '#94A3B8', fontSize: '12px', borderBottom: '1px solid #F1F5F9' },
  td: { padding: '16px 12px', borderBottom: '1px solid #F8FAFC', fontSize: '13px', color: '#334155' },
  btnDetail: { background: '#fff', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', color: '#64748B' },
  pager: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' },
  pBtn: { border: '1px solid #E2E8F0', background: '#fff', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' },
  pageInfo: { fontSize: '12px', color: '#94A3B8' },
  iconGrey: { color: '#94A3B8' },
  tr: { cursor: 'pointer' }
};

export default StoresPage;
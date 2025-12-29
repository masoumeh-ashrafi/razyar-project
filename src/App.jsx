import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StockPage from './pages/StockPage';
import StoresPage from './pages/FinalDashboard';
import VerifyPage from './pages/VerifyPage';

// وارد کردن فایل جدید که با هم ساختیم


function App() {
  return (
    <Router>
      <Routes>
        {/* صفحه اصلی روی ثبت نام */}
        <Route path="/" element={<RegisterPage />} />
        
        <Route path="/stores" element={<StoresPage />} />
        
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/stock" element={<StockPage />} />

        {/* هدایت آدرس‌های اشتباه */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
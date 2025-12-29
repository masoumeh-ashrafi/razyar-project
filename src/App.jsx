import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import PasswordPage from './pages/PasswordPage';
import RegisterPage from './pages/RegisterPage';
import StockPage from './pages/StockPage';
import StoresPage from './pages/StoresPage';
import VerifyPage from './pages/VerifyPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحه اصلی روی ثبت نام */}
        <Route path="/" element={<RegisterPage />} />
        
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/stock" element={<StockPage />} />

        {/* هدایت آدرس‌های اشتباه */}
        <Route path="*" element={<Navigate to="/" />} />

<Route path="/verify" element={<PasswordPage />} />

        
      </Routes>
    </Router>
  );
}

export default App;
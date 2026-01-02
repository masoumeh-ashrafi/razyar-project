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
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/password" element={<PasswordPage />} /> 
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
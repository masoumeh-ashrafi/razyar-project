import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setIsLoading(true); // شروع لودینگ

    // شبیه‌سازی اتصال به
=======
    setIsLoading(true);
>>>>>>> 0e49202
    setTimeout(() => {
        setIsLoading(false);
        navigate('/stores');
    }, 600);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', direction: 'rtl', backgroundColor: '#f8fafc' }}>
      <form onSubmit={handlePasswordSubmit} style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center', width: '350px' }}>
        <h2 style={{ marginBottom: '20px' }}>ورود</h2>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd', textAlign: 'center' }}
        />
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#f97316', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
          {isLoading ? 'در حال ورود...' : 'تایید'}
        </button>
      </form>
    </div>
  );
};

export default PasswordPage;
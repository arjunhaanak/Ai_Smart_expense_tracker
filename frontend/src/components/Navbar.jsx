import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, LogOut, LayoutDashboard, Database, TrendingUp } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card" style={{ 
      margin: '20px', 
      borderRadius: '16px', 
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 1000,
      background: 'rgba(30, 41, 59, 0.8)'
    }}>
      <Link to="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        textDecoration: 'none',
        color: 'var(--text-main)',
        fontSize: '1.5rem',
        fontWeight: '700'
      }}>
        <div style={{ 
          background: 'var(--primary)', 
          padding: '8px', 
          borderRadius: '12px',
          display: 'flex'
        }}>
          <Wallet size={24} color="white" />
        </div>
        <span>Smart<span style={{ color: 'var(--primary)' }}>AI</span></span>
      </Link>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link"><LayoutDashboard size={20} /> Dashboard</Link>
            <Link to="/analytics" className="nav-link"><TrendingUp size={20} /> Analytics</Link>
            <button onClick={handleLogout} className="btn-glass" style={{ padding: '8px 16px' }}>
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-glass">Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '10px 20px' }}>Register</Link>
          </>
        )}
      </div>

      <style>{`
        .nav-link {
          color: var(--text-dim);
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition);
        }
        .nav-link:hover {
          color: var(--text-main);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

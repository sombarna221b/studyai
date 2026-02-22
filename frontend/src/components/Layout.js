import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { to: '/app/dashboard',  emoji: '📊', label: 'Dashboard'  },
  { to: '/app/documents',  emoji: '📄', label: 'Documents'  },
  { to: '/app/flashcards', emoji: '🃏', label: 'Flashcards' },
  { to: '/app/quizzes',    emoji: '🎯', label: 'Quizzes'    },
  { to: '/app/profile',    emoji: '👤', label: 'Profile'    },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.95"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!collapsed && <span className="logo-text">StudyAI</span>}
          {!collapsed && (
            <button className="collapse-btn" onClick={() => setCollapsed(true)} title="Collapse">‹</button>
          )}
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {/* Expand button shown as first item when collapsed */}
          {collapsed && (
            <button className="expand-btn" onClick={() => setCollapsed(false)} title="Expand sidebar">›</button>
          )}
          {NAV_ITEMS.map(({ to, emoji, label }) => (
            <NavLink
              key={to} to={to}
              title={collapsed ? label : ''}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}${collapsed ? ' centered' : ''}`}
            >
              <span className="nav-emoji">{emoji}</span>
              {!collapsed && <span className="nav-label">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className={`sidebar-footer${collapsed ? ' footer-collapsed' : ''}`}>
          {!collapsed ? (
            <>
              <div className="user-row">
                {user?.avatar
                  ? <img src={user.avatar} alt="avatar" className="user-avatar-img" />
                  : <div className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
                }
                <div className="user-details">
                  <p className="user-name">{user?.name}</p>
                  <p className="user-email">{user?.email}</p>
                </div>
              </div>
              <div className="footer-actions">
                <button className="action-btn" onClick={toggleTheme} title="Toggle theme">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button className="logout-full-btn" onClick={handleLogout}>
                  ↪ Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              {user?.avatar
                ? <img src={user.avatar} alt="avatar" className="user-avatar-img sm" />
                : <div className="user-avatar sm">{user?.name?.charAt(0).toUpperCase()}</div>
              }
              <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">{theme === 'dark' ? '☀️' : '🌙'}</button>
              <button className="icon-btn danger" onClick={handleLogout} title="Sign out">↪</button>
            </>
          )}
        </div>
      </aside>

      <main className="main-content"><Outlet /></main>

      <style>{`
        .layout { display: flex; min-height: 100vh; }

        .sidebar {
          width: 240px; height: 100vh;
          position: sticky; top: 0; flex-shrink: 0; z-index: 10;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
        }
        .sidebar.collapsed { width: 64px; }

        .sidebar-header {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 1rem 0.875rem; min-height: 60px; flex-shrink: 0;
          border-bottom: 1px solid var(--border);
        }
        .sidebar.collapsed .sidebar-header {
          justify-content: center;
          padding: 1rem 0;
        }
        .logo-mark {
          width: 34px; height: 34px; flex-shrink: 0;
          background: var(--accent); border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; box-shadow: 0 0 16px rgba(79,142,247,0.4);
        }
        .logo-text {
          font-family: var(--font-display); font-weight: 800; font-size: 1.05rem;
          color: var(--text-primary); white-space: nowrap; flex: 1;
        }
        .collapse-btn {
          width: 22px; height: 22px; flex-shrink: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 6px; color: var(--text-muted);
          font-size: 1.1rem; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: var(--transition);
        }
        .collapse-btn:hover { color: var(--accent); border-color: var(--accent); }

        .sidebar-nav {
          flex: 1; overflow-y: auto; overflow-x: hidden;
          display: flex; flex-direction: column; gap: 2px;
          padding: 0.75rem 0.625rem;
        }

        .expand-btn {
          width: 100%; padding: 0.6rem; border-radius: 10px;
          background: var(--bg-card); border: 1px solid var(--border);
          color: var(--text-muted); font-size: 1.2rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: var(--transition);
          margin-bottom: 2px; flex-shrink: 0;
        }
        .expand-btn:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-glow); }

        .nav-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.6rem 0.75rem; border-radius: 10px;
          color: var(--text-muted); font-size: 0.875rem; font-weight: 500;
          transition: var(--transition); white-space: nowrap; text-decoration: none;
        }
        .nav-item:hover { color: var(--text-primary); background: var(--bg-card); }
        .nav-item.active { color: var(--accent); background: var(--accent-glow); }
        .nav-item.centered { justify-content: center; padding: 0.65rem; gap: 0; }
        .nav-emoji { font-size: 1.05rem; flex-shrink: 0; line-height: 1; }

        .sidebar-footer {
          border-top: 1px solid var(--border);
          padding: 0.875rem 0.75rem;
          display: flex; flex-direction: column; gap: 0.625rem; flex-shrink: 0;
        }
        .sidebar-footer.footer-collapsed { align-items: center; gap: 0.5rem; }

        .user-row { display: flex; align-items: center; gap: 0.625rem; min-width: 0; }
        .user-avatar-img {
          width: 36px; height: 36px; border-radius: 50%;
          object-fit: cover; border: 2px solid var(--accent);
          flex-shrink: 0;
        }
        .user-avatar-img.sm { width: 30px; height: 30px; }
        .user-avatar {
          width: 32px; height: 32px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display); font-weight: 700; font-size: 0.85rem; color: white;
        }
        .user-avatar.sm { width: 30px; height: 30px; font-size: 0.8rem; }
        .user-details { min-width: 0; flex: 1; }
        .user-name {
          font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .user-email {
          font-size: 0.68rem; color: var(--text-muted);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .footer-actions { display: flex; gap: 0.5rem; align-items: center; }
        .action-btn {
          width: 30px; height: 30px; flex-shrink: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 7px; cursor: pointer; font-size: 0.9rem;
          display: flex; align-items: center; justify-content: center;
          transition: var(--transition);
        }
        .action-btn:hover { border-color: var(--accent); transform: rotate(15deg); }
        .logout-full-btn {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 0.375rem;
          padding: 0.45rem 0.75rem;
          background: var(--danger-bg); border: 1px solid rgba(248,113,113,0.2);
          border-radius: 8px; color: var(--danger);
          font-size: 0.8rem; font-weight: 600; cursor: pointer;
          transition: var(--transition); font-family: var(--font-body); white-space: nowrap;
        }
        .logout-full-btn:hover { background: rgba(248,113,113,0.18); border-color: var(--danger); }
        .icon-btn {
          width: 32px; height: 32px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 8px; cursor: pointer; font-size: 0.85rem;
          display: flex; align-items: center; justify-content: center;
          transition: var(--transition); color: var(--text-muted);
          font-family: var(--font-body);
        }
        .icon-btn:hover { border-color: var(--accent); color: var(--accent); }
        .icon-btn.danger:hover { border-color: var(--danger); color: var(--danger); background: var(--danger-bg); }

        .main-content { flex: 1; min-width: 0; padding: 2rem; overflow-x: hidden; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main-content { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
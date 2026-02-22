import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function StaticLayout({ children, title, subtitle, tag }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="static-root" data-theme={theme}>
      <nav className="static-nav">
        <Link to="/" className="static-logo">
          <div className="static-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.95"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>StudyAI</span>
        </Link>
        <div className="static-nav-right">
          <button className="static-theme-btn" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          <Link to="/" className="static-back">← Home</Link>
          <Link to="/register" className="static-cta">Get started free</Link>
        </div>
      </nav>

      <div className="static-hero">
        <span className="static-tag">{tag}</span>
        <h1 className="static-title">{title}</h1>
        {subtitle && <p className="static-subtitle">{subtitle}</p>}
      </div>

      <main className="static-body">{children}</main>

      <footer className="static-footer">
        <div className="static-footer-inner">
          <p>© {new Date().getFullYear()} StudyAI Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="static-footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
            <a href="mailto:hello@studyai.app">Contact</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .static-root{min-height:100vh;background:var(--sp-bg);color:var(--sp-text);font-family:'DM Sans',sans-serif;
          --sp-bg:#06091a;--sp-text:#e8edf8;--sp-card:#0d1628;--sp-border:#1a2840;--sp-muted:#8899bb;--sp-accent:#4f8ef7;--sp-sub:#6b7fa8;
          transition:background 0.3s,color 0.3s;}
        [data-theme="light"].static-root{--sp-bg:#f0f4ff;--sp-text:#0f1729;--sp-card:#fff;--sp-border:rgba(0,0,0,0.09);--sp-muted:#4a5a8a;--sp-sub:#6a7a9a;}
        .static-nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;background:rgba(6,9,26,0.88);backdrop-filter:blur(16px);border-bottom:1px solid var(--sp-border);}
        [data-theme="light"] .static-nav{background:rgba(240,244,255,0.92);}
        .static-logo{display:flex;align-items:center;gap:.625rem;text-decoration:none;font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:var(--sp-text);}
        .static-logo-icon{width:32px;height:32px;background:#4f8ef7;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.9rem;box-shadow:0 0 16px rgba(79,142,247,.4);}
        .static-nav-right{display:flex;align-items:center;gap:.875rem;}
        .static-theme-btn{width:32px;height:32px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;transition:all .2s;}
        .static-theme-btn:hover{transform:rotate(15deg);}
        .static-back{font-size:.85rem;color:var(--sp-sub);text-decoration:none;transition:color .2s;}
        .static-back:hover{color:var(--sp-text);}
        .static-cta{padding:.45rem 1rem;background:#4f8ef7;color:white;border-radius:8px;font-size:.85rem;font-weight:600;text-decoration:none;transition:all .2s;}
        .static-cta:hover{background:#6ba3ff;transform:translateY(-1px);}
        .static-hero{max-width:800px;margin:0 auto;padding:5rem 2rem 3rem;text-align:center;}
        .static-tag{display:inline-block;padding:.3rem .875rem;border-radius:999px;background:rgba(79,142,247,.1);border:1px solid rgba(79,142,247,.2);font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4f8ef7;margin-bottom:1rem;}
        .static-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:800;line-height:1.15;margin-bottom:.875rem;}
        .static-subtitle{font-size:1rem;color:var(--sp-sub);line-height:1.7;max-width:560px;margin:0 auto;}
        .static-body{max-width:800px;margin:0 auto;padding:0 2rem 6rem;}
        .static-footer{border-top:1px solid var(--sp-border);padding:2rem;}
        .static-footer-inner{max-width:800px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;}
        .static-footer-inner p{font-size:.78rem;color:var(--sp-sub);}
        .static-footer-links{display:flex;gap:1.25rem;}
        .static-footer-links a{font-size:.78rem;color:var(--sp-sub);text-decoration:none;transition:color .2s;}
        .static-footer-links a:hover{color:var(--sp-accent);}
        .prose h2{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;color:var(--sp-text);margin:2.5rem 0 1rem;padding-top:2.5rem;border-top:1px solid var(--sp-border);}
        .prose h2:first-child{margin-top:0;padding-top:0;border-top:none;}
        .prose h3{font-size:1rem;font-weight:600;color:var(--sp-text);margin:1.5rem 0 .625rem;}
        .prose p{font-size:.9rem;color:var(--sp-muted);line-height:1.8;margin-bottom:1rem;}
        .prose ul{padding-left:1.25rem;display:flex;flex-direction:column;gap:.5rem;margin-bottom:1rem;}
        .prose ul li{font-size:.9rem;color:var(--sp-muted);line-height:1.7;}
        .prose a{color:var(--sp-accent);}
        .prose a:hover{text-decoration:underline;}
        .prose .highlight{background:rgba(79,142,247,.08);border:1px solid rgba(79,142,247,.15);border-radius:12px;padding:1.25rem 1.5rem;margin:1.5rem 0;}
        .prose .highlight p{margin:0;color:var(--sp-text);}
        .prose strong{color:var(--sp-text);font-weight:600;}
        .last-updated{font-size:.78rem;color:var(--sp-sub);margin-bottom:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid var(--sp-border);}
      `}</style>
    </div>
  );
}
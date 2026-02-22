import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { data } = await registerUser(form);
      login(data);
      toast.success(`Welcome aboard, ${data.name}!`);
      navigate('/app/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root" data-auth-theme={theme}>
      {/* Top bar */}
      <div className="auth-topbar">
        <a href="/" className="back-home">← Back to home</a>
        <button className="theme-pill" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="auth-bg">
        <div className="bg-orb orb-a" />
        <div className="bg-orb orb-b" />
        <div className="bg-orb orb-c" />
        <div className="bg-grid" />
      </div>

      {/* Geometric floating shapes */}
      <div className="geo-shapes">
        <svg className="geo g1" viewBox="0 0 60 60"><polygon points="30,5 55,50 5,50" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <svg className="geo g2" viewBox="0 0 60 60"><rect x="10" y="10" width="40" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(20 30 30)"/></svg>
        <svg className="geo g3" viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/></svg>
        <svg className="geo g4" viewBox="0 0 60 60"><polygon points="30,5 55,50 5,50" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <svg className="geo g5" viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <svg className="geo g6" viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1"/></svg>
        <svg className="geo g7" viewBox="0 0 60 60"><polygon points="30,5 57,22 47,52 13,52 3,22" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <svg className="geo g8" viewBox="0 0 60 60"><rect x="15" y="15" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 30 30)"/></svg>
      </div>

      <div className="auth-card">
        <div className="brand">
          <div className="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.95"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Study</span><span className="brand-accent">AI</span>
          </div>
        </div>

        <div className="auth-top">
          <h1 className="auth-heading">Create account</h1>
          <p className="auth-sub">Join 50,000+ students studying smarter</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label className="field-label">Full name</label>
            <div className="field-wrap">
              <span className="field-icon">👤</span>
              <input
                className="field-input"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Email address</label>
            <div className="field-wrap">
              <span className="field-icon">✉</span>
              <input
                className="field-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="field-wrap">
              <span className="field-icon">🔒</span>
              <input
                className="field-input"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Compact password strength */}
          {form.password.length > 0 && (
            <div className="strength-row">
              {['weak','fair','good','strong'].map((lvl, i) => (
                <div
                  key={i}
                  className="strength-bar"
                  style={{
                    background: form.password.length > i * 3
                      ? i < 1 ? '#f87171' : i < 2 ? '#fb923c' : i < 3 ? '#fbbf24' : '#34d399'
                      : 'var(--auth-pill-bg)'
                  }}
                />
              ))}
              <span className="strength-label">
                {form.password.length < 4 ? 'Weak' : form.password.length < 7 ? 'Fair' : form.password.length < 10 ? 'Good' : 'Strong'}
              </span>
            </div>
          )}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading
              ? <><span className="btn-spinner" /> Creating account...</>
              : <><span>Create account</span><span className="btn-arrow">→</span></>
            }
          </button>
        </form>

        <p className="auth-switch" style={{ marginTop: '1.25rem' }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <p className="auth-legal">
          By creating an account, you agree to our <a href="/terms">Terms</a> and <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .auth-root {
          height: 100vh; max-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          background: var(--auth-bg); padding: 1rem;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }
        .auth-bg { position: fixed; inset: 0; pointer-events: none; }
        .bg-orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); opacity: var(--auth-orb-opacity);
          animation: orbFloat 8s ease-in-out infinite;
        }
        .orb-a { width: 520px; height: 520px; background: #a78bfa; top: -180px; right: -180px; animation-delay: 0s; }
        .orb-b { width: 380px; height: 380px; background: #4f8ef7; bottom: -120px; left: -100px; animation-delay: -3s; }
        .orb-c { width: 250px; height: 250px; background: #34d399; top: 40%; left: 40%; animation-delay: -5s; opacity: var(--auth-particle-opacity); }
        .bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(var(--auth-grid-color) 1px, transparent 1px),
                            linear-gradient(90deg, var(--auth-grid-color) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-30px) scale(1.05); }
          66% { transform: translate(-15px,20px) scale(0.97); }
        }
        .particles { position: fixed; inset: 0; pointer-events: none; }
        .particle {
          position: absolute; font-size: 1.4rem;
          opacity: var(--auth-particle-opacity); animation: particleDrift 12s ease-in-out infinite;
          filter: blur(0.5px);
        }
        .p1 { top: 15%; left: 8%;  animation-delay: 0s;  animation-duration: 14s; }
        .p2 { top: 70%; left: 6%;  animation-delay: -4s; animation-duration: 11s; }
        .p3 { top: 25%; right: 8%; animation-delay: -2s; animation-duration: 16s; }
        .p4 { top: 75%; right: 6%; animation-delay: -7s; animation-duration: 13s; }
        .p5 { top: 50%; left: 50%; animation-delay: -5s; animation-duration: 18s; }
        .p6 { top: 10%; right: 20%;animation-delay: -9s; animation-duration: 15s; }
        @keyframes particleDrift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-24px) rotate(10deg); }
        }

        .auth-card {
          position: relative; z-index: 10;
          width: 100%; max-width: 420px;
          background: var(--auth-card-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--auth-border);
          border-radius: 24px;
          padding: 2rem 2rem 1.75rem;
          box-shadow: 0 0 0 1px var(--auth-input-bg),
                      var(--auth-shadow),
                      0 0 60px rgba(167,139,250,0.08);
          animation: cardReveal 0.5s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .brand { display: flex; align-items: center; gap: 0.625rem; margin-bottom: 1.5rem; }
        .brand-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #a78bfa, #4f8ef7);
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(167,139,250,0.5); flex-shrink: 0;
        }
        .brand-text { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; line-height: 1; }
        .brand-name { color: var(--auth-input-color); }
        .brand-accent { color: #a78bfa; }

        .auth-top { margin-bottom: 1.5rem; }
        .auth-heading {
          font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800;
          color: var(--auth-input-color); margin-bottom: 0.25rem; line-height: 1.2;
        }
        .auth-sub { font-size: 0.875rem; color: var(--auth-sub); }

        .auth-form { display: flex; flex-direction: column; gap: 0.875rem; }
        .field-group { display: flex; flex-direction: column; gap: 0.35rem; }
        .field-label {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--auth-label);
        }
        .field-wrap { position: relative; display: flex; align-items: center; }
        .field-icon {
          position: absolute; left: 0.875rem;
          font-size: 0.85rem; color: var(--auth-label); pointer-events: none; z-index: 1;
        }
        .field-input {
          width: 100%;
          background: var(--auth-input-bg);
          border: 1px solid var(--auth-input-border);
          border-radius: 10px;
          padding: 0.7rem 1rem 0.7rem 2.5rem;
          color: var(--auth-input-color); font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease; outline: none;
        }
        .field-input::placeholder { color: var(--auth-placeholder); }
        .field-input:focus {
          border-color: rgba(167,139,250,0.5);
          background: var(--auth-grid-color);
          box-shadow: 0 0 0 3px rgba(167,139,250,0.12);
        }
        .pass-toggle {
          position: absolute; right: 0.75rem;
          background: none; border: none; cursor: pointer;
          font-size: 0.85rem; color: var(--auth-label); transition: color 0.2s ease; padding: 0.25rem;
        }
        .pass-toggle:hover { color: var(--auth-label); }

        /* Strength bar */
        .strength-row {
          display: flex; align-items: center; gap: 4px; margin-top: -0.25rem;
        }
        .strength-bar {
          flex: 1; height: 3px; border-radius: 2px;
          transition: background 0.3s ease;
        }
        .strength-label { font-size: 0.68rem; color: var(--auth-sub); margin-left: 4px; white-space: nowrap; }

        .auth-submit {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          width: 100%; padding: 0.825rem;
          background: linear-gradient(135deg, #a78bfa, #6366f1);
          border: none; border-radius: 11px;
          color: white; font-size: 0.95rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.2s ease;
          margin-top: 0.25rem;
          box-shadow: 0 4px 20px rgba(167,139,250,0.35);
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(167,139,250,0.5);
        }
        .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-arrow { font-size: 1rem; transition: transform 0.2s ease; }
        .auth-submit:hover .btn-arrow { transform: translateX(4px); }
        .btn-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite; display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-switch { text-align: center; font-size: 0.875rem; color: var(--auth-sub); }
        .auth-switch a { color: #a78bfa; font-weight: 600; }
        .auth-switch a:hover { text-decoration: underline; }
        .auth-legal {
          text-align: center; font-size: 0.7rem;
          color: var(--auth-placeholder); margin-top: 0.875rem; line-height: 1.5;
        }
        .auth-legal a { color: var(--auth-label); }
        .auth-legal a:hover { color: var(--auth-label); }
        .auth-topbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 1.5rem;
        }
        .back-home {
          font-size: 0.82rem; font-weight: 500; color: var(--auth-topbar-text);
          transition: color 0.2s ease; text-decoration: none;
        }
        .back-home:hover { color: var(--auth-topbar-hover); }
        .theme-pill {
          display: flex; align-items: center; gap: 0.375rem;
          padding: 0.375rem 0.75rem; border-radius: 999px;
          background: var(--auth-pill-bg);
          border: 1px solid var(--auth-pill-border);
          color: var(--auth-topbar-text); font-size: 0.78rem;
          cursor: pointer; transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .theme-pill:hover { background: rgba(255,255,255,0.12); color: var(--auth-topbar-hover); }

        /* Light mode override for auth pages */
        [data-auth-theme="light"] .auth-root,
        .auth-root[data-auth-theme="light"] {
          --auth-bg: #f3eeff;
        }
        [data-auth-theme="light"] .bg-orb { opacity: 0.25; }
        [data-auth-theme="light"] .auth-card {
          background: rgba(255,255,255,0.82) !important;
          border-color: rgba(167,139,250,0.25) !important;
          box-shadow: 0 24px 80px rgba(0,0,0,0.12), 0 0 40px rgba(167,139,250,0.1) !important;
        }
        [data-auth-theme="light"] .auth-heading { color: #0f1729 !important; }
        [data-auth-theme="light"] .auth-sub { color: #4a5a8a !important; }
        [data-auth-theme="light"] .field-label { color: #5a6a8a !important; }
        [data-auth-theme="light"] .field-input {
          background: rgba(0,0,0,0.04) !important;
          border-color: rgba(0,0,0,0.12) !important;
          color: #0f1729 !important;
        }
        [data-auth-theme="light"] .field-input::placeholder { color: #9aaac8 !important; }
        [data-auth-theme="light"] .field-input:focus {
          border-color: rgba(167,139,250,0.5) !important;
          background: rgba(167,139,250,0.05) !important;
        }
        [data-auth-theme="light"] .field-icon { color: #8a9abb !important; }
        [data-auth-theme="light"] .auth-switch { color: #4a5a8a !important; }
        [data-auth-theme="light"] .auth-legal { color: #8a9abb !important; }
        [data-auth-theme="light"] .back-home { color: rgba(15,23,41,0.45) !important; }
        [data-auth-theme="light"] .back-home:hover { color: rgba(15,23,41,0.85) !important; }
        [data-auth-theme="light"] .theme-pill {
          background: rgba(0,0,0,0.07) !important;
          border-color: rgba(0,0,0,0.12) !important;
          color: rgba(15,23,41,0.6) !important;
        }
        [data-auth-theme="light"] .auth-divider::before,
        [data-auth-theme="light"] .auth-divider::after { background: rgba(0,0,0,0.1) !important; }
        [data-auth-theme="light"] .auth-divider span { color: #8a9abb !important; }
        [data-auth-theme="light"] .particle { opacity: 0.18 !important; }
        [data-auth-theme="light"] .bg-grid {
          background-image: linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px) !important;
        }
      `}</style>
    </div>
  );
}
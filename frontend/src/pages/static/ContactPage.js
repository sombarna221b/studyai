import React, { useState } from 'react';
import StaticLayout from './SharedLayout';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production this would POST to your backend
    setSent(true);
  };

  const contacts = [
    { icon: '💬', label: 'General Enquiries', email: 'hello@studyai.app', desc: 'Anything and everything' },
    { icon: '🛠️', label: 'Technical Support', email: 'support@studyai.app', desc: 'Bugs, issues, help' },
    { icon: '🔒', label: 'Privacy & Data', email: 'privacy@studyai.app', desc: 'Data requests, GDPR' },
    { icon: '💼', label: 'Partnerships', email: 'partnerships@studyai.app', desc: 'Colleges, institutions' },
  ];

  return (
    <StaticLayout tag="Support" title="Contact Us" subtitle="We read every message and reply within 24 hours on business days.">
      <div className="contact-grid">
        <div className="contact-channels">
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.1rem',fontWeight:700,color:'var(--sp-text)',marginBottom:'1rem'}}>Get in touch</h2>
          {contacts.map((c, i) => (
            <a key={i} href={`mailto:${c.email}`} className="contact-channel">
              <span className="contact-ch-icon">{c.icon}</span>
              <div>
                <div className="contact-ch-label">{c.label}</div>
                <div className="contact-ch-email">{c.email}</div>
                <div className="contact-ch-desc">{c.desc}</div>
              </div>
            </a>
          ))}
          <div className="contact-response">
            <span>⏱️</span>
            <div>
              <strong>Response time</strong>
              <p>We typically reply within 4 hours during business hours (IST, Mon–Fri).</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.1rem',fontWeight:700,color:'var(--sp-text)',marginBottom:'1rem'}}>Send a message</h2>
          {sent ? (
            <div className="contact-sent">
              <span>✅</span>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="cf-field">
                <label>Your name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" required />
              </div>
              <div className="cf-field">
                <label>Email address</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" required />
              </div>
              <div className="cf-field">
                <label>Subject</label>
                <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                  <option>General</option>
                  <option>Technical Support</option>
                  <option>Privacy & Data</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="cf-field">
                <label>Message</label>
                <textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us how we can help..." required />
              </div>
              <button type="submit" className="cf-submit">Send message →</button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .contact-grid{display:grid;grid-template-columns:1fr 1.3fr;gap:3rem;align-items:start;}
        .contact-channel{display:flex;align-items:flex-start;gap:.875rem;padding:1rem;background:var(--sp-card);border:1px solid var(--sp-border);border-radius:12px;text-decoration:none;margin-bottom:.625rem;transition:all .2s;}
        .contact-channel:hover{border-color:rgba(79,142,247,.35);}
        .contact-ch-icon{font-size:1.25rem;flex-shrink:0;margin-top:.1rem;}
        .contact-ch-label{font-size:.85rem;font-weight:700;color:var(--sp-text);margin-bottom:.15rem;}
        .contact-ch-email{font-size:.78rem;color:#4f8ef7;margin-bottom:.15rem;}
        .contact-ch-desc{font-size:.75rem;color:var(--sp-sub);}
        .contact-response{display:flex;gap:.75rem;align-items:flex-start;padding:1rem;background:rgba(79,142,247,.06);border:1px solid rgba(79,142,247,.15);border-radius:12px;margin-top:.5rem;}
        .contact-response span{font-size:1.2rem;flex-shrink:0;}
        .contact-response strong{display:block;font-size:.85rem;color:var(--sp-text);margin-bottom:.25rem;}
        .contact-response p{font-size:.78rem;color:var(--sp-muted);margin:0;line-height:1.5;}
        .cf-field{display:flex;flex-direction:column;gap:.375rem;margin-bottom:.875rem;}
        .cf-field label{font-size:.75rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--sp-sub);}
        .cf-field input,.cf-field select,.cf-field textarea{padding:.7rem 1rem;background:rgba(255,255,255,0.04);border:1px solid var(--sp-border);border-radius:10px;color:var(--sp-text);font-size:.875rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;resize:vertical;}
        .cf-field input:focus,.cf-field select:focus,.cf-field textarea:focus{border-color:rgba(79,142,247,.45);}
        .cf-field input::placeholder,.cf-field textarea::placeholder{color:var(--sp-sub);}
        .cf-field select option{background:#0d1628;}
        .cf-submit{width:100%;padding:.8rem;background:linear-gradient(135deg,#4f8ef7,#6366f1);color:white;border:none;border-radius:10px;font-size:.9rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;}
        .cf-submit:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(79,142,247,.35);}
        .contact-sent{text-align:center;padding:3rem 2rem;}
        .contact-sent span{font-size:2.5rem;display:block;margin-bottom:1rem;}
        .contact-sent h3{font-family:'Syne',sans-serif;font-size:1.2rem;color:var(--sp-text);margin-bottom:.5rem;}
        .contact-sent p{font-size:.9rem;color:var(--sp-muted);}
        @media(max-width:700px){.contact-grid{grid-template-columns:1fr;gap:2rem;}}
      `}</style>
    </StaticLayout>
  );
}
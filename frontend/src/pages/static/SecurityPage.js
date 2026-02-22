import React from 'react';
import StaticLayout from './SharedLayout';

const measures = [
  { icon: '🔐', title: 'AES-256 Encryption', desc: 'All data stored at rest is encrypted using AES-256, the same standard used by banks and governments.' },
  { icon: '🔒', title: 'TLS in Transit', desc: 'All data transmitted between your browser and our servers is encrypted using TLS 1.3.' },
  { icon: '🛡️', title: 'JWT Authentication', desc: 'Secure JSON Web Tokens with short expiry and refresh rotation protect your account sessions.' },
  { icon: '🏰', title: 'Isolated Sandboxes', desc: 'Document processing happens in isolated environments — your files never touch another user\'s data.' },
  { icon: '🔍', title: 'Regular Audits', desc: 'We conduct regular internal security reviews and plan annual third-party penetration testing.' },
  { icon: '⚡', title: 'Rate Limiting', desc: 'All API endpoints are rate-limited to prevent abuse, brute force attacks, and denial of service.' },
];

export default function SecurityPage() {
  return (
    <StaticLayout tag="Security" title="Security at StudyAI" subtitle="We take the security of your documents and data seriously. Here's exactly how we protect you.">
      <div className="prose">
        <div className="highlight"><p>Found a security vulnerability? Please report it responsibly to <a href="mailto:security@studyai.app">security@studyai.app</a>. We respond within 24 hours and credit all valid reports.</p></div>
      </div>

      <div className="sec-grid">
        {measures.map((m, i) => (
          <div key={i} className="sec-card">
            <span className="sec-icon">{m.icon}</span>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="prose">
        <h2>Infrastructure</h2>
        <p>StudyAI runs on enterprise-grade cloud infrastructure:</p>
        <ul>
          <li><strong>Database:</strong> MongoDB Atlas with VPC peering, IP allowlisting, and encrypted backups</li>
          <li><strong>File Storage:</strong> Cloudinary with signed URLs and access controls</li>
          <li><strong>Backend:</strong> Deployed on Render with environment isolation</li>
          <li><strong>AI Processing:</strong> Google Gemini API with data processing agreements</li>
        </ul>

        <h2>Access Controls</h2>
        <p>Production database access is restricted to essential team members only, requires multi-factor authentication, and all access is logged and monitored. No contractor or third party has access to production systems.</p>

        <h2>Incident Response</h2>
        <p>In the event of a security incident affecting user data, we commit to notifying affected users within 72 hours via email, in accordance with GDPR requirements.</p>

        <h2>Report a Vulnerability</h2>
        <div className="highlight"><p>📧 <strong>security@studyai.app</strong><br/>We take all reports seriously and commit to responding within 24 hours. Please do not publicly disclose vulnerabilities before we have a chance to address them.</p></div>
      </div>

      <style>{`
        .sec-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:1.5rem 0 2.5rem;}
        .sec-card{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:16px;padding:1.5rem;transition:all .25s;}
        .sec-card:hover{border-color:rgba(79,142,247,0.35);transform:translateY(-3px);}
        .sec-icon{font-size:1.75rem;display:block;margin-bottom:.75rem;}
        .sec-card h3{font-size:.9rem;font-weight:700;color:var(--sp-text);margin-bottom:.5rem;}
        .sec-card p{font-size:.82rem;color:var(--sp-muted);line-height:1.7;margin:0;}
        @media(max-width:600px){.sec-grid{grid-template-columns:1fr;}}
      `}</style>
    </StaticLayout>
  );
}
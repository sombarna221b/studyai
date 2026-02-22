import React, { useState } from 'react';
import StaticLayout from './SharedLayout';

const partnerTypes = [
  { icon: '🎓', title: 'Educational Institutions', desc: 'Universities, colleges, coaching institutes and schools looking to provide AI-powered study tools to their students at scale.', perks: ['Bulk student accounts', 'Custom branding options', 'Admin dashboard & analytics', 'Priority support'] },
  { icon: '🏢', title: 'EdTech Companies', desc: 'Platforms and products in the education space looking to integrate AI document processing, flashcard generation, or quiz capabilities via API.', perks: ['REST API access', 'White-label options', 'Revenue sharing model', 'Dedicated integration support'] },
  { icon: '📣', title: 'Content Creators & Educators', desc: 'YouTubers, course creators, tutors and educators with an audience of students who could benefit from StudyAI.', perks: ['Affiliate commissions', 'Custom referral codes', 'Co-marketing opportunities', 'Early feature access'] },
  { icon: '💼', title: 'Corporate Training', desc: 'Companies that want to use StudyAI to power internal training, onboarding documentation and knowledge retention programs.', perks: ['Team accounts', 'SSO integration', 'Custom document libraries', 'Compliance reporting'] },
];

const faqs = [
  { q: 'How long does it take to get a partnership set up?', a: 'Most partnerships are active within 5–10 business days after our initial call. API integrations typically take 2–4 weeks depending on complexity.' },
  { q: 'Is there a minimum commitment?', a: 'No minimum for most partnership types. We work with partners of all sizes — from a 20-student coaching class to a 50,000-student university.' },
  { q: 'Do you offer revenue sharing?', a: 'Yes, for affiliate and content creator partnerships we offer competitive revenue sharing. Details discussed on the intro call.' },
  { q: 'Can we white-label StudyAI?', a: 'Yes, white-labeling is available for EdTech and institutional partners. Contact us for pricing.' },
];

export default function PartnershipsPage() {
  const [form, setForm] = useState({ name: '', org: '', email: '', type: 'Educational Institution', message: '' });
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <StaticLayout
      tag="Partnerships"
      title="Partner With StudyAI"
      subtitle="Let's build something meaningful together. We partner with institutions, EdTech companies, educators and enterprises to bring AI-powered learning to more students."
    >
      {/* Partner types */}
      <div className="partner-grid">
        {partnerTypes.map((p, i) => (
          <div key={i} className="partner-card">
            <span className="partner-icon">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <ul className="partner-perks">
              {p.perks.map((perk, j) => <li key={j}><span className="perk-check">✓</span>{perk}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div className="partner-stats">
        {[
          { val: '50K+', label: 'Active students' },
          { val: '98%', label: 'Satisfaction rate' },
          { val: '2M+', label: 'Flashcards generated' },
          { val: '< 2min', label: 'Avg. setup time' },
        ].map((s, i) => (
          <div key={i} className="pstat">
            <span className="pstat-val">{s.val}</span>
            <span className="pstat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="partner-form-section">
        <div className="partner-form-left">
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--sp-text)', marginBottom: '0.75rem' }}>
            Let's talk
          </h2>
          <p style={{ color: 'var(--sp-muted)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Fill in the form and we'll get back to you within 24 hours. Prefer email? Reach us directly at{' '}
            <a href="mailto:partnerships@studyai.app" style={{ color: 'var(--sp-accent)' }}>partnerships@studyai.app</a>
          </p>
          <div className="partner-faq">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sp-text)', marginBottom: '0.875rem' }}>Common questions</h3>
            {faqs.map((f, i) => (
              <div key={i} className={`pfaq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
                <div className="pfaq-q"><span>{f.q}</span><span className="pfaq-icon">{open === i ? '−' : '+'}</span></div>
                {open === i && <p className="pfaq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="partner-form-right">
          {sent ? (
            <div className="partner-sent">
              <span>🎉</span>
              <h3>Thanks for reaching out!</h3>
              <p>Our partnerships team will contact you within 24 hours at <strong>{form.email}</strong>.</p>
            </div>
          ) : (
            <form className="partner-form" onSubmit={handleSubmit}>
              <div className="pf-field">
                <label>Your Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" required />
              </div>
              <div className="pf-field">
                <label>Organisation / Institution</label>
                <input value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} placeholder="IIT Delhi / EduTech Pvt. Ltd." required />
              </div>
              <div className="pf-field">
                <label>Work Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@institution.edu" required />
              </div>
              <div className="pf-field">
                <label>Partnership Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Educational Institution</option>
                  <option>EdTech Company / API Integration</option>
                  <option>Content Creator / Affiliate</option>
                  <option>Corporate Training</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="pf-field">
                <label>Tell us about your use case</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="How many students? What problem are you solving? Any specific requirements?" required />
              </div>
              <button type="submit" className="pf-submit">Send partnership enquiry →</button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .partner-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; margin-bottom: 2.5rem; }
        .partner-card { background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: 16px; padding: 1.5rem; transition: all .25s; }
        .partner-card:hover { border-color: rgba(79,142,247,.35); transform: translateY(-3px); }
        .partner-icon { font-size: 1.75rem; display: block; margin-bottom: .75rem; }
        .partner-card h3 { font-size: .95rem; font-weight: 700; color: var(--sp-text); margin-bottom: .5rem; }
        .partner-card p { font-size: .82rem; color: var(--sp-muted); line-height: 1.7; margin-bottom: .875rem; }
        .partner-perks { list-style: none; display: flex; flex-direction: column; gap: .375rem; }
        .partner-perks li { font-size: .78rem; color: var(--sp-muted); display: flex; align-items: center; gap: .5rem; }
        .perk-check { color: #34d399; font-weight: 700; font-size: .75rem; flex-shrink: 0; }
        .partner-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; background: linear-gradient(90deg,rgba(79,142,247,.08),rgba(167,139,250,.08)); border: 1px solid rgba(79,142,247,.15); border-radius: 16px; margin-bottom: 3rem; overflow: hidden; }
        .pstat { padding: 1.5rem 1rem; text-align: center; border-right: 1px solid rgba(79,142,247,.12); display: flex; flex-direction: column; gap: .375rem; }
        .pstat:last-child { border-right: none; }
        .pstat-val { font-family: 'Syne',sans-serif; font-size: 1.6rem; font-weight: 800; background: linear-gradient(135deg,#4f8ef7,#a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pstat-label { font-size: .75rem; color: var(--sp-sub); }
        .partner-form-section { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: start; }
        .partner-faq { display: flex; flex-direction: column; gap: .5rem; }
        .pfaq-item { background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: 10px; padding: .875rem 1rem; cursor: pointer; transition: all .2s; }
        .pfaq-item:hover, .pfaq-item.open { border-color: rgba(79,142,247,.35); }
        .pfaq-q { display: flex; justify-content: space-between; align-items: center; gap: .75rem; font-size: .82rem; font-weight: 600; color: var(--sp-text); }
        .pfaq-icon { color: #4f8ef7; font-size: 1rem; flex-shrink: 0; }
        .pfaq-a { font-size: .8rem; color: var(--sp-muted); line-height: 1.7; margin-top: .625rem; padding-top: .625rem; border-top: 1px solid var(--sp-border); }
        .pf-field { display: flex; flex-direction: column; gap: .375rem; margin-bottom: .875rem; }
        .pf-field label { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--sp-sub); }
        .pf-field input, .pf-field select, .pf-field textarea { padding: .7rem 1rem; background: rgba(255,255,255,0.04); border: 1px solid var(--sp-border); border-radius: 10px; color: var(--sp-text); font-size: .875rem; font-family: 'DM Sans',sans-serif; outline: none; transition: border-color .2s; resize: vertical; }
        .pf-field input:focus, .pf-field select:focus, .pf-field textarea:focus { border-color: rgba(79,142,247,.45); }
        .pf-field input::placeholder, .pf-field textarea::placeholder { color: var(--sp-sub); }
        .pf-field select option { background: #0d1628; }
        .pf-submit { width: 100%; padding: .8rem; background: linear-gradient(135deg,#4f8ef7,#6366f1); color: white; border: none; border-radius: 10px; font-size: .9rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans',sans-serif; transition: all .2s; }
        .pf-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,142,247,.35); }
        .partner-sent { text-align: center; padding: 3rem 1.5rem; background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: 16px; }
        .partner-sent span { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
        .partner-sent h3 { font-family: 'Syne',sans-serif; font-size: 1.15rem; color: var(--sp-text); margin-bottom: .5rem; }
        .partner-sent p { font-size: .875rem; color: var(--sp-muted); }
        .partner-sent strong { color: var(--sp-text); }
        @media(max-width:700px) { .partner-grid,.partner-form-section { grid-template-columns:1fr; } .partner-stats { grid-template-columns:repeat(2,1fr); } .pstat:nth-child(2) { border-right:none; } }
      `}</style>
    </StaticLayout>
  );
}
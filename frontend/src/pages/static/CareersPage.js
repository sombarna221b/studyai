import React, { useState } from 'react';
import StaticLayout from './SharedLayout';

const roles = [
  { title: 'Senior Full-Stack Engineer', team: 'Engineering', type: 'Full-time · Remote', skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'] },
  { title: 'AI/ML Engineer', team: 'AI Research', type: 'Full-time · Bangalore / Remote', skills: ['Python', 'LLMs', 'RAG', 'Vector DBs'] },
  { title: 'Product Designer', team: 'Design', type: 'Full-time · Remote', skills: ['Figma', 'Motion Design', 'User Research'] },
  { title: 'Growth Marketing Manager', team: 'Growth', type: 'Full-time · Bangalore', skills: ['SEO', 'Content', 'Paid Ads', 'Analytics'] },
];

const perks = [
  { icon: '🏠', title: 'Remote First', desc: 'Work from anywhere in India. We meet in-person quarterly in Bangalore.' },
  { icon: '🎓', title: 'Learning Budget', desc: '₹50,000/year for courses, books, and conferences. We invest in your growth.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Top-of-market salaries + equity. We believe in sharing the upside.' },
  { icon: '🏥', title: 'Health Insurance', desc: 'Full medical coverage for you and your immediate family.' },
  { icon: '⏰', title: 'Flexible Hours', desc: 'Async-first culture. Ship great work on your schedule.' },
  { icon: '🚀', title: 'Real Impact', desc: 'Your work directly affects 50K+ students every day. That matters.' },
];

export default function CareersPage() {
  const [open, setOpen] = useState(null);
  return (
    <StaticLayout tag="Careers" title="Join Our Team" subtitle="We're a small, passionate team building tools that help students learn better. Come build with us.">
      <div className="prose">
        <div className="highlight"><p>📍 Remote-first · Bangalore HQ · 12-person team · Series A in progress</p></div>
        <h2>Why StudyAI?</h2>
        <p>We're at an exciting inflection point — 50,000 students, rapid growth, and a product that genuinely makes a difference. If you want to work on hard problems in AI and education without layers of bureaucracy, this is your place.</p>
      </div>

      <div className="perks-grid">
        {perks.map((p, i) => (
          <div key={i} className="perk-card">
            <span className="perk-icon">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="prose"><h2>Open Roles</h2></div>

      <div className="roles-list">
        {roles.map((r, i) => (
          <div key={i} className={`role-card ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
            <div className="role-header">
              <div>
                <h3>{r.title}</h3>
                <div className="role-meta">
                  <span className="role-team">{r.team}</span>
                  <span className="role-type">{r.type}</span>
                </div>
              </div>
              <span className="role-arrow">{open === i ? '−' : '+'}</span>
            </div>
            {open === i && (
              <div className="role-body">
                <div className="role-skills">
                  {r.skills.map((s, j) => <span key={j} className="skill-tag">{s}</span>)}
                </div>
                <p>We're looking for someone exceptional to join our {r.team} team. You'll work directly with the founding team, ship fast, and have real ownership over your work.</p>
                <a href="mailto:careers@studyai.app" className="role-apply">Apply for this role → careers@studyai.app</a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="prose">
        <h2>Don't See Your Role?</h2>
        <div className="highlight"><p>We hire for talent, not just open positions. If you're exceptional at what you do and care about education, send us a note at <a href="mailto:careers@studyai.app">careers@studyai.app</a>.</p></div>
      </div>

      <style>{`
        .perks-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin:1.5rem 0 2.5rem;}
        .perk-card{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:14px;padding:1.25rem;}
        .perk-icon{font-size:1.5rem;display:block;margin-bottom:.625rem;}
        .perk-card h3{font-size:.875rem;font-weight:700;color:var(--sp-text);margin-bottom:.375rem;}
        .perk-card p{font-size:.8rem;color:var(--sp-muted);line-height:1.6;margin:0;}
        .roles-list{display:flex;flex-direction:column;gap:.75rem;margin-bottom:2.5rem;}
        .role-card{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:14px;padding:1.25rem 1.5rem;cursor:pointer;transition:all .2s;}
        .role-card:hover,.role-card.open{border-color:rgba(79,142,247,0.35);}
        .role-header{display:flex;justify-content:space-between;align-items:center;gap:1rem;}
        .role-card h3{font-size:.95rem;font-weight:700;color:var(--sp-text);margin-bottom:.375rem;}
        .role-meta{display:flex;gap:.625rem;align-items:center;flex-wrap:wrap;}
        .role-team{font-size:.72rem;font-weight:700;color:#4f8ef7;padding:.15rem .5rem;background:rgba(79,142,247,.1);border-radius:4px;}
        .role-type{font-size:.75rem;color:var(--sp-sub);}
        .role-arrow{font-size:1.25rem;color:#4f8ef7;font-weight:400;flex-shrink:0;}
        .role-body{margin-top:1rem;padding-top:1rem;border-top:1px solid var(--sp-border);}
        .role-skills{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.875rem;}
        .skill-tag{padding:.25rem .625rem;background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.2);border-radius:6px;font-size:.72rem;font-weight:600;color:#a78bfa;}
        .role-body p{font-size:.875rem;color:var(--sp-muted);line-height:1.7;margin-bottom:.875rem;}
        .role-apply{font-size:.85rem;font-weight:600;color:#4f8ef7;}
        .role-apply:hover{text-decoration:underline;}
        @media(max-width:600px){.perks-grid{grid-template-columns:1fr 1fr;}}
      `}</style>
    </StaticLayout>
  );
}
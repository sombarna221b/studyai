import React from 'react';
import StaticLayout from './SharedLayout';

const posts = [
  { emoji: '🧠', tag: 'Learning Science', title: 'Why Spaced Repetition Works: The Science Behind Flashcards', date: 'Feb 14, 2026', read: '5 min read', desc: 'Dive into the cognitive science of spaced repetition and active recall — and why AI-generated flashcards might be the most efficient study tool ever built.' },
  { emoji: '🎯', tag: 'Study Tips', title: '10 Ways Students Are Using AI to Cut Study Time in Half', date: 'Feb 8, 2026', read: '7 min read', desc: 'Real strategies from real students — from UPSC aspirants to MBBS students — on how they use StudyAI to study smarter, not longer.' },
  { emoji: '📄', tag: 'Product', title: 'How StudyAI Reads Your PDFs: A Look Under the Hood', date: 'Jan 30, 2026', read: '4 min read', desc: 'A transparent look at how we extract text, structure content, and send it to Gemini AI to generate accurate, relevant study materials.' },
  { emoji: '⚡', tag: 'Product Update', title: 'Introducing Quiz Mode: Test Yourself Like Never Before', date: 'Jan 22, 2026', read: '3 min read', desc: 'Our new adaptive quiz engine generates fresh questions every time, tracks your score history, and highlights your weakest topics automatically.' },
  { emoji: '🔒', tag: 'Privacy', title: 'Your Documents Are Safe: How We Handle Your Data', date: 'Jan 15, 2026', read: '4 min read', desc: 'A plain-English breakdown of our privacy practices — encryption, data isolation, third-party agreements, and your rights as a user.' },
  { emoji: '🎓', tag: 'Student Stories', title: 'From 60% to 91%: How Priya Used StudyAI to Crack Her Medical Exams', date: 'Jan 7, 2026', read: '6 min read', desc: 'AIIMS Delhi student Priya Sharma shares her exact workflow for uploading lecture notes, generating 200+ flashcards, and reviewing them daily.' },
];

export default function BlogPage() {
  return (
    <StaticLayout tag="Blog" title="StudyAI Blog" subtitle="Learning science, product updates, student stories, and study tips from the StudyAI team.">
      <div className="blog-grid">
        {posts.map((p, i) => (
          <div key={i} className="blog-card">
            <div className="blog-emoji">{p.emoji}</div>
            <div className="blog-meta">
              <span className="blog-tag">{p.tag}</span>
              <span className="blog-date">{p.date} · {p.read}</span>
            </div>
            <h2>{p.title}</h2>
            <p>{p.desc}</p>
            <span className="blog-coming">Coming soon →</span>
          </div>
        ))}
      </div>
      <div className="blog-subscribe">
        <h3>Get new posts in your inbox</h3>
        <p>We publish weekly on learning science, product updates, and student success stories.</p>
        <div className="blog-sub-row">
          <input className="blog-sub-input" type="email" placeholder="you@example.com" />
          <button className="blog-sub-btn">Subscribe</button>
        </div>
      </div>

      <style>{`
        .blog-grid{display:grid;grid-template-columns:1fr;gap:1.25rem;margin-bottom:3rem;}
        .blog-card{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:16px;padding:1.75rem;transition:all .25s;cursor:default;}
        .blog-card:hover{border-color:rgba(79,142,247,0.35);transform:translateY(-3px);box-shadow:0 8px 30px rgba(0,0,0,0.25);}
        .blog-emoji{font-size:1.75rem;margin-bottom:.875rem;}
        .blog-meta{display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;}
        .blog-tag{padding:.2rem .625rem;border-radius:999px;background:rgba(79,142,247,.1);border:1px solid rgba(79,142,247,.2);font-size:.7rem;font-weight:700;color:#4f8ef7;letter-spacing:.05em;}
        .blog-date{font-size:.75rem;color:var(--sp-sub);}
        .blog-card h2{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:var(--sp-text);margin-bottom:.625rem;line-height:1.4;}
        .blog-card p{font-size:.875rem;color:var(--sp-muted);line-height:1.75;margin-bottom:1rem;}
        .blog-coming{font-size:.8rem;color:#4f8ef7;font-weight:600;}
        .blog-subscribe{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:20px;padding:2rem;text-align:center;}
        .blog-subscribe h3{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:var(--sp-text);margin-bottom:.5rem;}
        .blog-subscribe p{font-size:.875rem;color:var(--sp-muted);margin-bottom:1.25rem;}
        .blog-sub-row{display:flex;gap:.625rem;max-width:400px;margin:0 auto;}
        .blog-sub-input{flex:1;padding:.65rem 1rem;background:rgba(255,255,255,0.05);border:1px solid var(--sp-border);border-radius:10px;color:var(--sp-text);font-size:.875rem;font-family:'DM Sans',sans-serif;outline:none;}
        .blog-sub-input:focus{border-color:rgba(79,142,247,0.4);}
        .blog-sub-input::placeholder{color:var(--sp-sub);}
        .blog-sub-btn{padding:.65rem 1.25rem;background:#4f8ef7;color:white;border:none;border-radius:10px;font-size:.875rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;}
        .blog-sub-btn:hover{background:#6ba3ff;}
      `}</style>
    </StaticLayout>
  );
}
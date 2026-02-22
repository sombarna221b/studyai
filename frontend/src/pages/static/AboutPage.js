import React from 'react';
import StaticLayout from './SharedLayout';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const team = [
    { name: 'Sombarna Basu', role: 'Founder & CEO', avatar: 'SB', bio: 'KIIT Bhubaneswar. Built StudyAI after struggling with exam prep during her engineering years.' },
    { name: 'Sneha Rao', role: 'Head of AI', avatar: 'S', bio: 'ML researcher with 5 years at Google DeepMind. Obsessed with making AI genuinely useful for learning.' },
    { name: 'Karan Malhotra', role: 'Lead Engineer', avatar: 'K', bio: 'Full-stack engineer who previously built edtech tools used by 200K+ students across India.' },
    { name: 'Priyanka Nair', role: 'Head of Design', avatar: 'P', bio: 'Product designer who believes great UX is invisible. Formerly at Figma and Notion.' },
  ];

  const values = [
    { icon: '🎓', title: 'Learning First', desc: 'Every decision we make starts with one question: does this help students learn better?' },
    { icon: '🔒', title: 'Privacy by Default', desc: 'We never sell data, never train on your documents, and make it easy to leave.' },
    { icon: '⚡', title: 'Speed Matters', desc: 'Students are busy. Every feature is designed to save time, not waste it.' },
    { icon: '🌍', title: 'Accessible to All', desc: 'World-class study tools shouldn\'t cost a fortune. We keep pricing fair and our free tier real.' },
  ];

  return (
    <StaticLayout tag="Company" title="About StudyAI" subtitle="We're on a mission to make every student's learning experience smarter, faster, and more effective.">
      <div className="prose">

        <div className="highlight">
          <p>📍 West Bengal, India &nbsp;·&nbsp; Founded 2025 &nbsp;·&nbsp; Backed by passion (and a little caffeine)</p>
        </div>

        <h2>Our Story</h2>
        <p>StudyAI was born out of frustration. Our founder Sombarna spent hundreds of hours manually creating flashcards and practice questions from dense engineering textbooks — time that could've been spent actually understanding the material.</p>
        <p>In 2025, with the rise of capable AI models like Google Gemini, he built the first version of StudyAI in a weekend. Students at his college started using it. Within weeks, thousands of students across India were uploading their notes, generating flashcards, and acing their exams.</p>
        <p>Today, StudyAI serves <strong>50,000+ active students</strong> from various universities across India and beyond. We're just getting started.</p>

        <h2>Our Values</h2>
      </div>

      <div className="about-values">
        {values.map((v, i) => (
          <div key={i} className="about-value-card">
            <span className="about-value-icon">{v.icon}</span>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="prose">
        <h2>The Team</h2>
      </div>

      <div className="about-team">
        {team.map((t, i) => (
          <div key={i} className="about-team-card">
            <div className="about-avatar">{t.avatar}</div>
            <h3>{t.name}</h3>
            <span className="about-role">{t.role}</span>
            <p>{t.bio}</p>
          </div>
        ))}
      </div>

      <div className="prose">
        <h2>Built With</h2>
        <p>StudyAI is built on a modern stack: <strong>React</strong> frontend, <strong>Node.js + Express</strong> backend, <strong>MongoDB Atlas</strong> for data, <strong>Google Gemini AI</strong> for intelligence, and <strong>Cloudinary</strong> for file storage. We're a small team that moves fast and ships often.</p>

        <h2>Work With Us</h2>
        <p>We're always looking for passionate people who care deeply about education and technology. Check out our <Link to="/careers">open roles</Link> or reach out directly at <a href="mailto:team@studyai.app">team@studyai.app</a>.</p>

        <h2>Get in Touch</h2>
        <div className="highlight"><p>📧 <strong>hello@studyai.app</strong> — We read every email and reply within 24 hours.</p></div>
      </div>

      <style>{`
        .about-values{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:1.5rem 0 2.5rem;}
        .about-value-card{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:16px;padding:1.5rem;transition:all .25s;}
        .about-value-card:hover{border-color:rgba(79,142,247,0.35);transform:translateY(-3px);}
        .about-value-icon{font-size:1.75rem;display:block;margin-bottom:.75rem;}
        .about-value-card h3{font-size:.95rem;font-weight:700;color:var(--sp-text);margin-bottom:.5rem;}
        .about-value-card p{font-size:.85rem;color:var(--sp-muted);line-height:1.7;margin:0;}
        .about-team{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:1.5rem 0 2.5rem;}
        .about-team-card{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:16px;padding:1.5rem;transition:all .25s;}
        .about-team-card:hover{border-color:rgba(79,142,247,0.3);}
        .about-avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#4f8ef7,#a78bfa);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:white;margin-bottom:.875rem;}
        .about-team-card h3{font-size:.95rem;font-weight:700;color:var(--sp-text);margin-bottom:.25rem;}
        .about-role{font-size:.75rem;font-weight:600;color:#4f8ef7;display:block;margin-bottom:.625rem;}
        .about-team-card p{font-size:.82rem;color:var(--sp-muted);line-height:1.7;margin:0;}
        @media(max-width:600px){.about-values,.about-team{grid-template-columns:1fr;}}
      `}</style>
    </StaticLayout>
  );
}
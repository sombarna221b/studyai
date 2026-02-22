import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ scrolled, theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.95"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>StudyAI</span>
        </Link>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </div>
        <div className="nav-cta">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link to="/login" className="btn-nav-ghost">Sign In</Link>
          <Link to="/register" className="btn-nav-primary">Get Started Free</Link>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="hero">
    <div className="hero-bg">
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />
      <div className="hero-grid" />
    </div>
    <div className="hero-content">
      <div className="hero-badge">
        <span className="badge-dot" />
        <span>Powered by Google Gemini AI</span>
      </div>
      <h1 className="hero-title">
        Transform Any PDF Into<br />
        <span className="hero-gradient">Your Personal Tutor</span>
      </h1>
      <p className="hero-subtitle">
        Upload study materials and let AI generate flashcards, quizzes, summaries,
        and answer your questions — all from your own documents.
      </p>
      <div className="hero-actions">
        <Link to="/register" className="btn-hero-primary">
          Start Learning Free
          <span className="btn-arrow">→</span>
        </Link>
        <a href="#how-it-works" className="btn-hero-ghost">See how it works</a>
      </div>
      <div className="hero-social-proof">
        <div className="proof-avatars">
          {['S','R','A','M','K'].map((l, i) => (
            <div key={i} className="proof-avatar" style={{ zIndex: 5 - i }}>{l}</div>
          ))}
        </div>
        <p><strong>2,400+</strong> students already learning smarter</p>
      </div>
    </div>
    <div className="hero-mockup">
      <div className="mockup-window">
        <div className="mockup-bar"><span /><span /><span /></div>
        <div className="mockup-body">
          <div className="mockup-sidebar">
            <div className="ms-item active">📊 Dashboard</div>
            <div className="ms-item">📄 Documents</div>
            <div className="ms-item">🃏 Flashcards</div>
            <div className="ms-item">🎯 Quizzes</div>
          </div>
          <div className="mockup-main">
            <div className="mm-card">
              <div className="mm-label">AI Chat</div>
              <div className="mm-msg user">What is cosine similarity?</div>
              <div className="mm-msg ai">Cosine similarity measures the angle between two vectors, returning a value from 0 to 1. It's widely used in NLP to compare document similarity...</div>
            </div>
            <div className="mm-stats">
              <div className="mm-stat"><span>📄</span><strong>12</strong><small>Docs</small></div>
              <div className="mm-stat"><span>🃏</span><strong>148</strong><small>Cards</small></div>
              <div className="mm-stat"><span>🎯</span><strong>87%</strong><small>Avg Score</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const features = [
  { icon: '🤖', title: 'AI-Powered Chat', desc: 'Ask questions about your documents and get context-aware answers powered by Google Gemini.', color: '#4f8ef7' },
  { icon: '🃏', title: 'Auto Flashcards', desc: 'Generate comprehensive flashcard sets from any document with a single click. Study smarter, not harder.', color: '#a78bfa' },
  { icon: '🎯', title: 'Custom Quizzes', desc: 'Create multiple-choice quizzes with configurable question counts and get detailed answer explanations.', color: '#34d399' },
  { icon: '📝', title: 'Smart Summaries', desc: 'Get concise, structured summaries of entire documents instantly. Perfect for revision and quick review.', color: '#fb923c' },
  { icon: '💡', title: 'Concept Explainer', desc: 'Enter any concept from your document and get a detailed, easy-to-understand explanation tailored to your material.', color: '#f472b6' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your study progress with a beautiful dashboard showing documents, cards, scores, and activity.', color: '#38bdf8' },
];

const Features = () => (
  <section className="section" id="features">
    <div className="section-container">
      <div className="section-header">
        <span className="section-tag">Features</span>
        <h2 className="section-title">Everything you need to<br />study effectively</h2>
        <p className="section-subtitle">Six powerful AI tools that transform passive reading into active, engaging learning experiences.</p>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card" style={{ '--fc': f.color }}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  { step: '01', icon: '📤', title: 'Upload Your PDF', desc: 'Drag and drop any PDF — textbooks, research papers, lecture notes, or any study material up to 20MB.' },
  { step: '02', icon: '⚡', title: 'AI Processes It', desc: "Our AI extracts and understands your document's content, making it ready for any learning activity in seconds." },
  { step: '03', icon: '🎓', title: 'Learn Interactively', desc: 'Chat with your document, generate flashcards, take quizzes, and track your progress — all in one place.' },
];

const HowItWorks = () => (
  <section className="section section-alt" id="how-it-works">
    <div className="section-container">
      <div className="section-header">
        <span className="section-tag">How It Works</span>
        <h2 className="section-title">From PDF to mastery<br />in three simple steps</h2>
      </div>
      <div className="steps-container">
        {steps.map((s, i) => (
          <div key={i} className="step-card">
            <div className="step-number">{s.step}</div>
            <div className="step-icon-wrap">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const testimonials = [
  { name: 'Priya Sharma', role: 'Medical Student, AIIMS Delhi', avatar: 'P', text: 'StudyAI completely changed how I prepare for exams. I upload my pathology notes and generate 200 flashcards in minutes. My retention has improved dramatically.' },
  { name: 'Arjun Mehta', role: 'CS Undergraduate, IIT Bombay', avatar: 'A', text: "The AI chat feature is incredible — it's like having a professor available 24/7. I ask questions about my algorithms textbook and get clear, contextual answers instantly." },
  { name: 'Dr. Kavya Reddy', role: 'Assistant Professor, BITS Pilani', avatar: 'K', text: 'I recommend StudyAI to all my students. The quiz generation saves me hours of work and the progress tracking helps students stay accountable. Genuinely impressive tool.' },
  { name: 'Rohit Kumar', role: 'CA Final Aspirant, Mumbai', avatar: 'R', text: 'The quiz generator is perfect for exam prep. I set it to 20 questions from my taxation notes and it creates varied, challenging questions every time. 100% recommend.' },
  { name: 'Anjali Patel', role: 'Research Scholar, IISc Bangalore', avatar: 'A', text: 'For literature review this is a game changer. I upload research papers and ask questions across topics. The summaries alone save me 2-3 hours per paper. Brilliant.' },
  { name: 'Dev Krishnan', role: 'UPSC Aspirant, Delhi', avatar: 'D', text: 'NCERT summaries, flashcards for GS topics, quizzes on current affairs PDFs — this tool has become an essential part of my daily study routine. Absolutely love it.' },
];

const Testimonials = () => (
  <section className="section" id="testimonials">
    <div className="section-container">
      <div className="section-header">
        <span className="section-tag">Testimonials</span>
        <h2 className="section-title">Loved by students<br />and educators alike</h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card" style={{'--delay': i * 0.08 + 's'}}>
            <div className="card-glow" />
            <div className="stars">{'★'.repeat(5)}</div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <div className="t-avatar">{t.avatar}</div>
              <div>
                <p className="t-name">{t.name}</p>
                <p className="t-role">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const StatsBanner = () => (
  <section className="stats-banner" id="stats">
    <div className="section-container">
      <div className="stats-banner-grid">
        {[
          { val: '50K+',  label: 'Active Students',  icon: '🎓' },
          { val: '2M+',   label: 'Flashcards Created', icon: '🃏' },
          { val: '500K+', label: 'Quizzes Taken',    icon: '🎯' },
          { val: '98%',   label: 'Satisfaction Rate', icon: '⭐' },
        ].map((s, i) => (
          <div key={i} className="stats-banner-item">
            <span className="stats-banner-icon">{s.icon}</span>
            <span className="stats-banner-val">{s.val}</span>
            <span className="stats-banner-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Privacy = () => (
  <section className="section" id="privacy">
    <div className="section-container">
      <div className="privacy-inner">
        <div className="privacy-text">
          <span className="section-tag">Privacy & Security</span>
          <h2 className="section-title" style={{textAlign:'left',marginTop:'0.75rem'}}>Your data is yours.<br/>Always.</h2>
          <p style={{color:'#8899bb',lineHeight:1.8,marginBottom:'1.75rem',fontSize:'1rem'}}>
            We built StudyAI with privacy as a core principle — not an afterthought.
            Your documents and study data are never shared, sold, or used to train AI models.
          </p>
          <div className="privacy-points">
            {[
              { icon: '🔐', title: 'End-to-end encryption', desc: 'All documents encrypted in transit and at rest using AES-256.' },
              { icon: '🚫', title: 'We never sell your data', desc: 'Your documents and study data are never shared with third parties.' },
              { icon: '🗑️', title: 'Delete anytime', desc: 'Delete your account and all data instantly — no questions asked.' },
              { icon: '🌍', title: 'GDPR compliant', desc: 'Fully compliant with GDPR, CCPA, and global data protection laws.' },
            ].map((p, i) => (
              <div key={i} className="privacy-point">
                <span className="privacy-point-icon">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="privacy-card">
          <div className="privacy-shield">🛡️</div>
          <h3>Our Privacy Commitments</h3>
          <ul className="privacy-list">
            {[
              'Documents processed in isolated sandboxes',
              'No training on your personal data',
              'JWT-secured authentication',
              'Regular third-party security audits',
              'Transparent data retention policies',
              'Right to access, modify & export data',
            ].map((item, i) => (
              <li key={i}><span className="check">✓</span>{item}</li>
            ))}
          </ul>
          <a href="mailto:privacy@studyai.app" className="privacy-contact">
            Questions? Contact our privacy team →
          </a>
        </div>
      </div>
    </div>
  </section>
);

const faqs = [
  { q: 'What types of PDFs work best?', a: 'StudyAI works with any text-based PDF — textbooks, research papers, lecture notes, articles, and more. Scanned image PDFs may have limited functionality as they require OCR processing.' },
  { q: 'How is my data protected?', a: 'Your documents are encrypted in transit and at rest. We never share your data with third parties or use it to train AI models. You can delete your documents at any time from your dashboard.' },
  { q: 'Which AI model powers StudyAI?', a: 'StudyAI is powered by Google Gemini, one of the most advanced multimodal AI models available. This ensures high-quality, accurate responses grounded in your document content.' },
  { q: 'Can I use StudyAI on mobile?', a: 'Yes! StudyAI is fully responsive and works on mobile browsers. A dedicated mobile app for iOS and Android is on our roadmap for Q2 2026.' },
  { q: 'Is there a student discount?', a: 'Yes — students with a valid .edu or .ac.in email address get 40% off the Pro plan. Contact us at students@studyai.app with your institutional email to claim the discount.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" id="faq">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
              <div className="faq-question">
                <span>{f.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </div>
              {open === i && <p className="faq-answer">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="cta-section">
    <div className="cta-inner">
      {/* Background effects */}
      <div className="cta-bg-orb cta-orb-1" />
      <div className="cta-bg-orb cta-orb-2" />
      <div className="cta-grid-overlay" />

      {/* Floating badges */}
      <div className="cta-badge cta-badge-1">🏆 #1 AI Study Tool</div>
      <div className="cta-badge cta-badge-2">⚡ Powered by Gemini</div>
      <div className="cta-badge cta-badge-3">🎯 98% satisfaction</div>

      <div className="cta-content">
        <div className="cta-eyebrow">
          <span className="cta-dot" />
          <span>Join 50,000+ students already learning smarter</span>
        </div>
        <h2 className="cta-title">
          Your next exam starts<br />
          <span className="cta-title-accent">right here, right now</span>
        </h2>
        <p className="cta-subtitle">
          Upload your first PDF in seconds. No credit card. No setup.<br />
          Just you, your documents, and an AI that actually helps you learn.
        </p>
        <div className="cta-actions">
          <Link to="/register" className="cta-btn-primary">
            <span>Get started — it's free</span>
            <span className="cta-btn-arrow">→</span>
          </Link>
          <Link to="/login" className="cta-btn-ghost">Already a member? Sign in</Link>
        </div>
        <div className="cta-trust">
          <span>🔒 No credit card required</span>
          <span>·</span>
          <span>🛡️ Your data stays private</span>
          <span>·</span>
          <span>❌ Cancel anytime</span>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-mark sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.95"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>StudyAI</span>
          </div>
          <p className="footer-tagline">Transform any PDF into an interactive learning experience with the power of AI.</p>
          <div className="social-links">
            {[
              { label: '𝕏', href: 'https://twitter.com/studyai_app', title: 'Twitter / X' },
              { label: 'in', href: 'https://linkedin.com/company/studyai', title: 'LinkedIn' },
              { label: 'IG', href: 'https://instagram.com/studyai.app', title: 'Instagram' },
              { label: 'GH', href: 'https://github.com/studyai-app', title: 'GitHub' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link" title={s.title}>{s.label}</a>
            ))}
          </div>
        </div>
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Reviews</a>
            <a href="#privacy">Privacy</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/security">Security</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/contact">Help Center</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/about">About Us</Link>
            <Link to="/partnerships">Partnerships</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} StudyAI Technologies Pvt. Ltd. All rights reserved.</p>
        <p>Made with ❤️ in India · Powered by Google Gemini AI</p>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="landing">
      <Navbar scrolled={scrolled} theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <StatsBanner />
      <Privacy />
      <FAQ />
      <CTA />
      <Footer />
      <style>{`
        .landing{background:var(--landing-bg, #06091a);color:var(--landing-text, #e8edf8);font-family:'DM Sans',sans-serif;overflow-x:hidden;transition:background 0.3s ease,color 0.3s ease;}
        /* LIGHT THEME OVERRIDES FOR LANDING */
        [data-theme="light"] .landing{
          --landing-bg: #f0f4ff;
          --landing-text: #0f1729;
        }
        [data-theme="light"] .navbar.scrolled{background:rgba(240,244,255,0.92);border-bottom-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .nav-links a{color:#4a5a8a;}
        [data-theme="light"] .nav-links a:hover{color:#0f1729;}
        [data-theme="light"] .btn-nav-ghost{color:#4a5a8a;}
        [data-theme="light"] .btn-nav-ghost:hover{color:#0f1729;}
        [data-theme="light"] .hero-orb{opacity:0.12;}
        [data-theme="light"] .hero-badge{background:rgba(79,142,247,0.1);border-color:rgba(79,142,247,0.25);}
        [data-theme="light"] .hero-subtitle{color:#4a5a8a;}
        [data-theme="light"] .hero-social-proof p{color:#4a5a8a;}
        [data-theme="light"] .mockup-window{background:#fff;border-color:rgba(0,0,0,0.12);box-shadow:0 24px 60px rgba(0,0,0,0.14);}
        [data-theme="light"] .mockup-bar{background:#f0f4ff;border-bottom-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .mockup-sidebar{background:#e8edf8;border-right-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .ms-item{color:#6a7a9a;}
        [data-theme="light"] .ms-item.active{background:rgba(79,142,247,0.12);color:#4f8ef7;}
        [data-theme="light"] .mockup-main{background:#f5f8ff;}
        [data-theme="light"] .mm-card{background:#fff;border-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .mm-label{color:#0f1729;}
        [data-theme="light"] .mm-bubble.user{background:#4f8ef7;}
        [data-theme="light"] .mm-bubble.ai{background:#fff;color:#0f1729;border:1px solid rgba(0,0,0,0.08);}
        [data-theme="light"] .mm-bubble.ai p{color:#4a5a8a;}
        [data-theme="light"] .section-alt{background:#e8edf8;}
        [data-theme="light"] .section-tag{background:rgba(79,142,247,0.1);border-color:rgba(79,142,247,0.2);color:#4f8ef7;}
        [data-theme="light"] .section-title{color:#0f1729;}
        [data-theme="light"] .section-subtitle{color:#4a5a8a;}
        [data-theme="light"] .feature-card{background:#fff;border-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .feature-card:hover{border-color:rgba(79,142,247,0.3);box-shadow:0 8px 30px rgba(0,0,0,0.1);}
        [data-theme="light"] .feature-card h3{color:#0f1729;}
        [data-theme="light"] .feature-card p{color:#4a5a8a;}
        [data-theme="light"] .step-card{background:#fff;border-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .step-card h3{color:#0f1729;}
        [data-theme="light"] .step-card p{color:#4a5a8a;}
        [data-theme="light"] .testimonial-card{background:#fff;border-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .testimonial-card:hover{border-color:rgba(79,142,247,0.3);}
        [data-theme="light"] .testimonial-text{color:#4a5a8a;}
        [data-theme="light"] .t-name{color:#0f1729;}
        [data-theme="light"] .t-role{color:#8a9abb;}
        [data-theme="light"] .stats-banner{background:linear-gradient(90deg,rgba(79,142,247,0.06),rgba(167,139,250,0.06));border-color:rgba(79,142,247,0.15);}
        [data-theme="light"] .stats-banner-item{border-right-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .stats-banner-label{color:#4a5a8a;}
        [data-theme="light"] .privacy-point strong{color:#0f1729;}
        [data-theme="light"] .privacy-point p{color:#6a7a9a;}
        [data-theme="light"] .privacy-card{background:#fff;border-color:rgba(0,0,0,0.1);}
        [data-theme="light"] .privacy-card h3{color:#0f1729;}
        [data-theme="light"] .privacy-list li{color:#4a5a8a;}
        [data-theme="light"] .faq-item{background:#fff;border-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .faq-item:hover{border-color:rgba(79,142,247,0.25);}
        [data-theme="light"] .faq-question{color:#0f1729;}
        [data-theme="light"] .faq-answer{color:#4a5a8a;border-top-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .cta-inner{background:linear-gradient(135deg,#e8eeff,#eef2ff);}
        [data-theme="light"] .cta-title{color:#0f1729;}
        [data-theme="light"] .cta-subtitle{color:#4a5a8a;}
        [data-theme="light"] .cta-btn-ghost{border-color:rgba(0,0,0,0.12);color:#4a5a8a;}
        [data-theme="light"] .cta-badge{background:rgba(0,0,0,0.04);border-color:rgba(0,0,0,0.08);color:#6a7a9a;}
        [data-theme="light"] .footer{background:#e0e6f5;border-top-color:rgba(0,0,0,0.08);}
        [data-theme="light"] .footer-tagline{color:#6a7a9a;}
        [data-theme="light"] .social-link{background:#fff;border-color:rgba(0,0,0,0.1);color:#6a7a9a;}
        [data-theme="light"] .footer-col h4{color:#0f1729;}
        [data-theme="light"] .footer-col a{color:#6a7a9a;}
        [data-theme="light"] .footer-col a:hover{color:#4f8ef7;}
        [data-theme="light"] .footer-bottom{border-top-color:rgba(0,0,0,0.08);color:#8a9abb;}
        [data-theme="light"] .nav-links.open{background:#f0f4ff;}
        [data-theme="light"] .theme-toggle-btn{background:rgba(0,0,0,0.06);border-color:rgba(0,0,0,0.1);}
        [data-theme="light"] .nav-logo{color:#0f1729 !important;}
        [data-theme="light"] .navbar.scrolled{background:rgba(240,244,255,0.95) !important;}
        /* NAVBAR */
        .navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.25rem 0;transition:all 0.3s ease;}
        .navbar.scrolled{background:rgba(6,9,26,0.9);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06);padding:.875rem 0;}
        .nav-container{max-width:1200px;margin:0 auto;padding:0 2rem;display:flex;align-items:center;gap:2rem;}
        .nav-logo{display:flex;align-items:center;gap:.625rem;font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#e8edf8;text-decoration:none;flex-shrink:0;transition:color .3s;}
        .logo-mark{width:34px;height:34px;background:#4f8ef7;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem;box-shadow:0 0 20px rgba(79,142,247,.5);}
        .logo-mark.sm{width:28px;height:28px;font-size:.85rem;}
        .nav-links{display:flex;align-items:center;gap:2rem;flex:1;justify-content:center;}
        .nav-links a{color:#8899bb;font-size:.9rem;text-decoration:none;transition:color .2s;font-weight:500;}
        .nav-links a:hover{color:#e8edf8;}
        .nav-cta{display:flex;align-items:center;gap:.75rem;flex-shrink:0;}
        .btn-nav-ghost{color:#8899bb;font-size:.875rem;font-weight:500;padding:.5rem 1rem;border-radius:8px;text-decoration:none;transition:color .2s;}
        .btn-nav-ghost:hover{color:#e8edf8;}
        .btn-nav-primary{background:#4f8ef7;color:white;font-size:.875rem;font-weight:600;padding:.5rem 1.25rem;border-radius:8px;text-decoration:none;transition:all .2s;white-space:nowrap;}
        .btn-nav-primary:hover{background:#6ba3ff;transform:translateY(-1px);box-shadow:0 4px 16px rgba(79,142,247,.4);}
        .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;}
        .hamburger span{width:22px;height:2px;background:#8899bb;border-radius:2px;transition:.3s;}
        /* HERO */
        .hero{min-height:100vh;display:flex;align-items:center;padding:8rem 2rem 4rem;position:relative;overflow:hidden;max-width:1200px;margin:0 auto;gap:4rem;}
        .hero-bg{position:fixed;inset:0;pointer-events:none;z-index:0;}
        .hero-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:.15;}
        .orb-1{width:600px;height:600px;background:#4f8ef7;top:-200px;left:-200px;}
        .orb-2{width:400px;height:400px;background:#a78bfa;top:50%;right:-100px;}
        .orb-3{width:300px;height:300px;background:#34d399;bottom:-100px;left:30%;}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(79,142,247,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,.03) 1px,transparent 1px);background-size:60px 60px;}
        .hero-content{flex:1;position:relative;z-index:1;animation:fadeInUp .8s ease;}
        .hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(79,142,247,.1);border:1px solid rgba(79,142,247,.25);border-radius:999px;padding:.375rem .875rem;font-size:.8rem;color:#4f8ef7;font-weight:500;margin-bottom:1.5rem;}
        .badge-dot{width:6px;height:6px;background:#4f8ef7;border-radius:50%;animation:pulse 2s infinite;}
        .hero-title{font-family:'Syne',sans-serif;font-size:clamp(2.2rem,5vw,3.5rem);font-weight:800;line-height:1.1;margin-bottom:1.25rem;}
        .hero-gradient{background:linear-gradient(135deg,#4f8ef7,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .hero-subtitle{font-size:1.05rem;color:#8899bb;line-height:1.7;margin-bottom:2rem;max-width:520px;}
        .hero-actions{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2.5rem;}
        .btn-hero-primary{display:inline-flex;align-items:center;gap:.5rem;background:#4f8ef7;color:white;font-weight:600;font-size:1rem;padding:.875rem 1.75rem;border-radius:12px;text-decoration:none;transition:all .2s;box-shadow:0 4px 24px rgba(79,142,247,.35);}
        .btn-hero-primary:hover{background:#6ba3ff;transform:translateY(-2px);box-shadow:0 8px 32px rgba(79,142,247,.5);}
        .btn-arrow{transition:transform .2s;}
        .btn-hero-primary:hover .btn-arrow{transform:translateX(4px);}
        .btn-hero-ghost{display:inline-flex;align-items:center;gap:.5rem;color:#8899bb;font-weight:500;font-size:1rem;padding:.875rem 1.75rem;border-radius:12px;text-decoration:none;border:1px solid rgba(255,255,255,.12);transition:all .2s;background:transparent;}
        .btn-hero-ghost:hover{color:#e8edf8;border-color:rgba(255,255,255,.3);background:rgba(255,255,255,.06);}
        [data-theme="light"] .btn-hero-ghost{color:#4a5a8a;border-color:rgba(0,0,0,.15);}
        [data-theme="light"] .btn-hero-ghost:hover{color:#0f1729;border-color:rgba(79,142,247,.5);background:rgba(79,142,247,.06);}
        .hero-social-proof{display:flex;align-items:center;gap:.875rem;}
        .proof-avatars{display:flex;}
        .proof-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4f8ef7,#a78bfa);border:2px solid #06091a;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;color:white;margin-left:-8px;}
        .proof-avatar:first-child{margin-left:0;}
        .hero-social-proof p{font-size:.85rem;color:#8899bb;}
        .hero-social-proof strong{color:#e8edf8;}
        /* MOCKUP */
        .hero-mockup{flex:1;position:relative;z-index:1;animation:fadeInUp 1s ease .2s both;}
        .mockup-window{background:#0f1729;border:1px solid #1e2d4a;border-radius:16px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,.6),0 0 0 1px rgba(79,142,247,.1);}
        .mockup-bar{background:#131d35;padding:.75rem 1rem;display:flex;gap:6px;align-items:center;border-bottom:1px solid #1e2d4a;}
        .mockup-bar span{width:10px;height:10px;border-radius:50%;}
        .mockup-bar span:nth-child(1){background:#f87171;}
        .mockup-bar span:nth-child(2){background:#fb923c;}
        .mockup-bar span:nth-child(3){background:#34d399;}
        .mockup-body{display:flex;}
        .mockup-sidebar{width:130px;background:#0d1628;padding:.75rem;border-right:1px solid #1e2d4a;}
        .ms-item{padding:.5rem .625rem;border-radius:8px;font-size:.7rem;color:#4a5a7a;margin-bottom:.25rem;}
        .ms-item.active{background:rgba(79,142,247,.15);color:#4f8ef7;}
        .mockup-main{flex:1;padding:.875rem;display:flex;flex-direction:column;gap:.75rem;}
        .mm-card{background:#131d35;border:1px solid #1e2d4a;border-radius:10px;padding:.75rem;}
        .mm-label{font-size:.65rem;color:#4a5a7a;font-weight:600;text-transform:uppercase;margin-bottom:.5rem;letter-spacing:.05em;}
        .mm-msg{font-size:.7rem;padding:.5rem .625rem;border-radius:8px;margin-bottom:.375rem;line-height:1.4;}
        .mm-msg.user{background:#4f8ef7;color:white;margin-left:20%;}
        .mm-msg.ai{background:#1a2540;color:#8899bb;}
        .mm-stats{display:flex;gap:.5rem;}
        .mm-stat{flex:1;background:#131d35;border:1px solid #1e2d4a;border-radius:8px;padding:.625rem;display:flex;flex-direction:column;align-items:center;gap:.25rem;font-size:.65rem;}
        .mm-stat strong{font-size:.9rem;color:#4f8ef7;font-family:'Syne',sans-serif;}
        .mm-stat small{color:#4a5a7a;}
        /* SECTIONS */
        .section{padding:6rem 2rem;}
        .section-alt{background:rgba(255,255,255,.02);}
        .section-container{max-width:1200px;margin:0 auto;}
        .section-header{text-align:center;margin-bottom:4rem;}
        .section-tag{display:inline-block;background:rgba(79,142,247,.1);color:#4f8ef7;border:1px solid rgba(79,142,247,.2);border-radius:999px;padding:.25rem .875rem;font-size:.75rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:1rem;}
        .section-title{font-family:'Syne',sans-serif;font-size:clamp(1.75rem,4vw,2.75rem);font-weight:800;line-height:1.15;margin-bottom:1rem;}
        .section-subtitle{color:#8899bb;font-size:1rem;max-width:520px;margin:0 auto;line-height:1.7;}
        /* FEATURES */
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .feature-card{background:#0f1729;border:1px solid #1e2d4a;border-radius:16px;padding:1.75rem;transition:all .3s ease;position:relative;overflow:hidden;}
        .feature-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at top left,var(--fc),transparent 60%);opacity:0;transition:opacity .3s;}
        .feature-card:hover{border-color:var(--fc);transform:translateY(-4px);}
        .feature-card:hover::before{opacity:.07;}
        .feature-icon{font-size:2rem;margin-bottom:1rem;}
        .feature-card h3{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-bottom:.5rem;}
        .feature-card p{font-size:.875rem;color:#8899bb;line-height:1.6;}
        /* HOW IT WORKS */
        .steps-container{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;position:relative;}
        .steps-container::before{content:'';position:absolute;top:4.5rem;left:20%;right:20%;height:2px;background:linear-gradient(90deg,transparent,#1e2d4a,transparent);z-index:0;}
        .step-card{text-align:center;padding:2rem 1.5rem;position:relative;z-index:1;}
        .step-number{font-family:'Syne',sans-serif;font-size:4rem;font-weight:800;color:rgba(79,142,247,.12);line-height:1;margin-bottom:.5rem;}
        [data-theme="light"] .step-number{color:rgba(79,142,247,.2);}
        .step-icon-wrap{font-size:2.5rem;margin-bottom:1rem;}
        .step-card h3{font-family:'Syne',sans-serif;font-size:1.15rem;font-weight:700;margin-bottom:.75rem;}
        .step-card p{font-size:.875rem;color:#8899bb;line-height:1.7;max-width:280px;margin:0 auto;}
        /* TESTIMONIALS */
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;}
        .testimonial-card{
          background:#0d1628;
          border:1px solid #1a2840;
          border-radius:16px;padding:1.75rem;
          display:flex;flex-direction:column;gap:1rem;
          transition:all .35s cubic-bezier(0.4,0,0.2,1);
          position:relative;overflow:hidden;
          cursor:default;
        }
        .card-glow{
          position:absolute;inset:0;
          background:radial-gradient(circle at 50% 0%, rgba(79,142,247,0.12) 0%, transparent 65%);
          opacity:0;transition:opacity .35s ease;pointer-events:none;
        }
        .testimonial-card:hover{
          border-color:rgba(79,142,247,0.45);
          transform:translateY(-5px);
          box-shadow:0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(79,142,247,0.15), 0 0 30px rgba(79,142,247,0.08);
        }
        .testimonial-card:hover .card-glow{opacity:1;}
        .testimonial-card:nth-child(3n+2):hover{border-color:rgba(167,139,250,0.45);box-shadow:0 12px 40px rgba(0,0,0,0.35),0 0 0 1px rgba(167,139,250,0.15),0 0 30px rgba(167,139,250,0.08);}
        .testimonial-card:nth-child(3n+2) .card-glow{background:radial-gradient(circle at 50% 0%,rgba(167,139,250,0.12) 0%,transparent 65%);}
        .testimonial-card:nth-child(3n+3):hover{border-color:rgba(52,211,153,0.4);box-shadow:0 12px 40px rgba(0,0,0,0.35),0 0 0 1px rgba(52,211,153,0.12),0 0 30px rgba(52,211,153,0.07);}
        .testimonial-card:nth-child(3n+3) .card-glow{background:radial-gradient(circle at 50% 0%,rgba(52,211,153,0.1) 0%,transparent 65%);}
        .stars{color:#fb923c;font-size:.875rem;letter-spacing:2px;position:relative;}
        .testimonial-text{font-size:.9rem;color:#8899bb;line-height:1.7;flex:1;font-style:italic;position:relative;}
        .testimonial-author{display:flex;align-items:center;gap:.75rem;position:relative;}
        .t-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#4f8ef7,#a78bfa);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.95rem;color:white;flex-shrink:0;}
        .t-name{font-size:.875rem;font-weight:600;color:#e8edf8;}
        .t-role{font-size:.75rem;color:#4a5a7a;}
        /* THEME TOGGLE IN NAV */
        .theme-toggle-btn{
          width:34px;height:34px;
          background:rgba(255,255,255,0.07);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:8px;cursor:pointer;font-size:1rem;
          display:flex;align-items:center;justify-content:center;
          transition:all .2s ease;flex-shrink:0;
        }
        .theme-toggle-btn:hover{background:rgba(255,255,255,0.13);transform:rotate(15deg);}
        /* STATS BANNER */
        .stats-banner{
          padding:2rem 0;
          background:linear-gradient(90deg,rgba(79,142,247,0.06),rgba(167,139,250,0.06));
          border-top:1px solid rgba(79,142,247,0.12);
          border-bottom:1px solid rgba(79,142,247,0.12);
        }
        .stats-banner-grid{
          display:grid;grid-template-columns:repeat(4,1fr);
          gap:0;
        }
        .stats-banner-item{
          display:flex;flex-direction:column;align-items:center;gap:.375rem;
          padding:1.25rem 1rem;
          border-right:1px solid rgba(255,255,255,0.06);
          transition:all .25s;
        }
        .stats-banner-item:last-child{border-right:none;}
        .stats-banner-item:hover{background:rgba(79,142,247,0.05);}
        .stats-banner-icon{font-size:1.5rem;}
        .stats-banner-val{
          font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;
          background:linear-gradient(135deg,#4f8ef7,#a78bfa);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          line-height:1;
        }
        .stats-banner-label{font-size:.8rem;color:#6b7fa8;font-weight:500;}
        /* PRIVACY */
        .privacy-inner{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;}
        .privacy-points{display:flex;flex-direction:column;gap:1.25rem;}
        .privacy-point{display:flex;gap:1rem;align-items:flex-start;}
        .privacy-point-icon{font-size:1.4rem;flex-shrink:0;margin-top:.1rem;}
        .privacy-point strong{display:block;font-size:.9rem;color:#c8d4f0;margin-bottom:.25rem;}
        .privacy-point p{font-size:.82rem;color:#4a5a7a;line-height:1.6;margin:0;}
        .privacy-card{
          background:#0d1628;border:1px solid #1a2840;
          border-radius:20px;padding:2rem;
          position:sticky;top:7rem;
        }
        .privacy-shield{font-size:2.5rem;margin-bottom:.75rem;}
        .privacy-card h3{font-size:1.05rem;font-weight:700;color:#c8d4f0;margin-bottom:1.25rem;}
        .privacy-list{list-style:none;display:flex;flex-direction:column;gap:.75rem;}
        .privacy-list li{
          display:flex;align-items:center;gap:.625rem;
          font-size:.875rem;color:#8899bb;
        }
        .check{
          color:#34d399;font-weight:700;font-size:.8rem;
          flex-shrink:0;
        }
        .privacy-contact{
          display:block;margin-top:1.5rem;
          font-size:.8rem;color:#4f8ef7;font-weight:500;
          text-decoration:none;
        }
        .privacy-contact:hover{text-decoration:underline;}
        /* FAQ */
        .faq-list{max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:.75rem;}
        .faq-item{background:#0f1729;border:1px solid #1e2d4a;border-radius:12px;padding:1.25rem 1.5rem;cursor:pointer;transition:all .2s;user-select:none;}
        .faq-item:hover{border-color:#253557;}
        .faq-item.open{border-color:#4f8ef7;}
        .faq-question{display:flex;justify-content:space-between;align-items:center;gap:1rem;font-weight:600;font-size:.95rem;}
        .faq-icon{color:#4f8ef7;font-size:1.2rem;flex-shrink:0;font-weight:400;}
        .faq-answer{font-size:.875rem;color:#8899bb;line-height:1.7;margin-top:.875rem;padding-top:.875rem;border-top:1px solid #1e2d4a;}
        /* CTA */
        .cta-section{padding:5rem 2rem;}
        .cta-inner{
          max-width:1100px;margin:0 auto;
          position:relative;overflow:hidden;
          background:linear-gradient(135deg,#090f22 0%,#0d1530 50%,#0a0f22 100%);
          border:1px solid rgba(79,142,247,0.2);
          border-radius:28px;
          padding:5rem 3rem;
          text-align:center;
        }
        .cta-bg-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;}
        .cta-orb-1{width:500px;height:500px;background:#4f8ef7;opacity:0.07;top:-200px;left:-150px;}
        .cta-orb-2{width:400px;height:400px;background:#a78bfa;opacity:0.07;bottom:-150px;right:-100px;}
        .cta-grid-overlay{
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(79,142,247,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,0.05) 1px,transparent 1px);
          background-size:40px 40px;
          mask-image:radial-gradient(ellipse at center,black 30%,transparent 75%);
          pointer-events:none;
        }
        .cta-badge{
          position:absolute;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:999px;padding:.375rem .875rem;
          font-size:.72rem;font-weight:500;color:#6b7fa8;
          white-space:nowrap;
        }
        .cta-badge-1{top:2.5rem;left:3rem;transform:rotate(-3deg);}
        .cta-badge-2{top:3rem;right:3rem;transform:rotate(2deg);}
        .cta-badge-3{bottom:3rem;left:3.5rem;transform:rotate(2deg);}
        .cta-content{position:relative;}
        .cta-eyebrow{
          display:inline-flex;align-items:center;gap:.5rem;
          padding:.375rem 1rem;border-radius:999px;
          background:rgba(79,142,247,0.1);border:1px solid rgba(79,142,247,0.2);
          font-size:.78rem;color:#4f8ef7;font-weight:500;
          margin-bottom:1.75rem;
        }
        .cta-dot{width:7px;height:7px;background:#4f8ef7;border-radius:50%;animation:pulse 2s infinite;}
        .cta-title{
          font-family:'Syne',sans-serif;
          font-size:clamp(2rem,4vw,3rem);font-weight:800;
          line-height:1.15;margin-bottom:1.25rem;
          color:#e8edf8;
        }
        .cta-title-accent{
          background:linear-gradient(135deg,#4f8ef7,#a78bfa);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          background-clip:text;
        }
        .cta-subtitle{color:#6b7fa8;font-size:1.05rem;line-height:1.7;max-width:520px;margin:0 auto 2.5rem;}
        .cta-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.5rem;}
        .cta-btn-primary{
          display:inline-flex;align-items:center;gap:.625rem;
          padding:.9rem 2.25rem;border-radius:12px;
          background:linear-gradient(135deg,#4f8ef7,#6366f1);
          color:white;font-weight:600;font-size:1rem;
          text-decoration:none;
          transition:all .25s ease;
          box-shadow:0 4px 20px rgba(79,142,247,0.35);
        }
        .cta-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(79,142,247,0.5);}
        .cta-btn-arrow{transition:transform .2s ease;}
        .cta-btn-primary:hover .cta-btn-arrow{transform:translateX(4px);}
        .cta-btn-ghost{
          display:inline-flex;align-items:center;
          padding:.9rem 2rem;border-radius:12px;
          border:1px solid rgba(255,255,255,0.1);
          color:#8899bb;font-size:.95rem;font-weight:500;
          text-decoration:none;transition:all .25s ease;
        }
        .cta-btn-ghost:hover{border-color:rgba(79,142,247,0.4);color:#e8edf8;background:rgba(79,142,247,0.07);}
        .cta-trust{
          display:flex;align-items:center;justify-content:center;
          gap:.875rem;flex-wrap:wrap;
          font-size:.78rem;color:#3a4a6a;
        }
        /* FOOTER */
        .footer{background:#060910;border-top:1px solid #0f1729;padding:4rem 2rem 2rem;}
        .footer-container{max-width:1200px;margin:0 auto;}
        .footer-top{display:grid;grid-template-columns:280px 1fr;gap:4rem;margin-bottom:3rem;}
        .footer-logo{display:flex;align-items:center;gap:.625rem;font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;margin-bottom:.875rem;}
        .footer-tagline{font-size:.85rem;color:#4a5a7a;line-height:1.6;margin-bottom:1.25rem;}
        .social-links{display:flex;gap:.5rem;}
        .social-link{width:36px;height:36px;background:#0f1729;border:1px solid #1e2d4a;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;color:#4a5a7a;text-decoration:none;transition:all .2s;}
        .social-link:hover{border-color:#4f8ef7;color:#4f8ef7;background:rgba(79,142,247,.1);}
        .footer-links-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
        .footer-col{display:flex;flex-direction:column;gap:.625rem;}
        .footer-col h4{font-family:'Syne',sans-serif;font-size:.85rem;font-weight:700;margin-bottom:.375rem;color:#c8d4f0;}
        .footer-col a{font-size:.85rem;color:#4a5a7a;text-decoration:none;transition:color .2s;}
        .footer-col a:hover{color:#8899bb;}
        .footer-bottom{border-top:1px solid #0f1729;padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;font-size:.8rem;color:#2a3a5a;}
        /* RESPONSIVE */
        @media(max-width:1024px){
          .stats-banner-grid{grid-template-columns:repeat(2,1fr);}
          .stats-banner-item:nth-child(2){border-right:none;}
          .privacy-inner{grid-template-columns:1fr;gap:2.5rem;}
          .privacy-card{position:static;}
          .hero{flex-direction:column;padding-top:7rem;text-align:center;}
          .hero-subtitle{margin:0 auto 2rem;}
          .hero-actions{justify-content:center;}
          .hero-social-proof{justify-content:center;}
          .hero-mockup{width:100%;max-width:560px;margin:0 auto;}
          .features-grid{grid-template-columns:repeat(2,1fr);}
          .testimonials-grid{grid-template-columns:1fr;}
          .footer-top{grid-template-columns:1fr;gap:2rem;}
        }
        @media(max-width:768px){
          .nav-links{display:none;}
          .nav-links.open{display:flex;flex-direction:column;position:fixed;inset:0;background:#06091a;justify-content:center;align-items:center;font-size:1.5rem;gap:2rem;z-index:99;}
          .nav-cta .btn-nav-ghost{display:none;}
          .hamburger{display:flex;}
          .features-grid{grid-template-columns:1fr;}
          .steps-container{grid-template-columns:1fr;}
          .steps-container::before{display:none;}
          .stats-grid{grid-template-columns:repeat(2,1fr);}
          .footer-links-grid{grid-template-columns:repeat(2,1fr);}
          .footer-bottom{flex-direction:column;text-align:center;}
        }
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
      `}</style>
    </div>
  );
}
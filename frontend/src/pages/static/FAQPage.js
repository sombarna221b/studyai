import React, { useState } from 'react';
import StaticLayout from './SharedLayout';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    cat: 'Getting Started',
    icon: '🚀',
    items: [
      { q: 'How do I get started with StudyAI?', a: 'Sign up for a free account, upload any PDF (lecture notes, textbooks, research papers), and choose what you want to generate — flashcards, a quiz, or a summary. The entire process takes under 2 minutes.' },
      { q: 'What file types does StudyAI support?', a: 'Currently we support PDF files. We\'re working on support for Word documents (.docx), PowerPoint (.pptx), and image-based notes in a future update.' },
      { q: 'Is there a file size limit?', a: 'Yes — files up to 50MB and 500 pages are supported. Most lecture notes and textbook chapters fall well within this limit.' },
    ]
  },
  {
    cat: 'Features',
    icon: '⚡',
    items: [
      { q: 'How accurate are the AI-generated flashcards?', a: 'Very accurate for factual, well-structured content. The AI extracts key concepts, definitions, and important points. We recommend reviewing the cards once before your first study session to catch any rare errors.' },
      { q: 'How many questions can a quiz have?', a: 'You can generate between 5 and 50 questions per quiz. You can also regenerate quizzes from the same document to get fresh questions each time.' },
      { q: 'Can I edit flashcards and quiz questions?', a: 'Full editing support is on our roadmap and coming very soon. Currently you can regenerate content from the same document to get different variations.' },
      { q: 'Does the AI chat understand context from my document?', a: 'Yes — the AI chat is document-aware. When you chat inside a document, your questions are answered with context from that specific PDF, not from general internet knowledge.' },
    ]
  },
  {
    cat: 'Account & Data',
    icon: '🔒',
    items: [
      { q: 'Is my data private and secure?', a: 'Absolutely. Your documents are stored encrypted and are never shared with third parties or used to train AI models. See our Privacy Policy for full details.' },
      { q: 'Can I delete my account and data?', a: 'Yes — you can delete your account anytime from the Profile page. All your data including uploaded documents, flashcards, and quizzes are permanently deleted within 30 days.' },
      { q: 'Can I export my flashcards?', a: 'CSV and PDF export is coming soon. It\'s one of our most-requested features and is actively being built.' },
    ]
  },
  {
    cat: 'Technical',
    icon: '🛠️',
    items: [
      { q: 'Which AI model powers StudyAI?', a: 'StudyAI is powered by Google Gemini — one of the most capable AI models available. It handles document understanding, flashcard generation, quiz creation, and the chat feature.' },
      { q: 'What browsers are supported?', a: 'StudyAI works on all modern browsers — Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience. Mobile browsers are supported but a desktop experience is recommended.' },
      { q: 'Is there a mobile app?', a: 'A mobile app for Android and iOS is on our roadmap. For now, the web app is fully responsive and works well on mobile browsers.' },
    ]
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState({});
  const toggle = (cat, i) => setOpen(prev => ({ ...prev, [`${cat}-${i}`]: !prev[`${cat}-${i}`] }));

  return (
    <StaticLayout tag="Support" title="Frequently Asked Questions" subtitle="Everything you need to know about StudyAI. Can't find your answer? Email us anytime.">
      <div className="faq-cats">
        {faqCategories.map((cat, ci) => (
          <div key={ci} className="faq-cat">
            <div className="faq-cat-header">
              <span>{cat.icon}</span>
              <h2>{cat.cat}</h2>
            </div>
            <div className="faq-items">
              {cat.items.map((item, ii) => {
                const key = `${ci}-${ii}`;
                return (
                  <div key={ii} className={`faq-item ${open[key] ? 'open' : ''}`} onClick={() => toggle(ci, ii)}>
                    <div className="faq-q">
                      <span>{item.q}</span>
                      <span className="faq-icon">{open[key] ? '−' : '+'}</span>
                    </div>
                    {open[key] && <p className="faq-a">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="faq-contact">
        <h3>Still have questions?</h3>
        <p>Our support team typically responds within 4 hours on business days.</p>
        <div className="faq-contact-btns">
          <a href="mailto:support@studyai.app" className="faq-contact-btn primary">📧 Email Support</a>
          <Link to="/about" className="faq-contact-btn ghost">Learn about us →</Link>
        </div>
      </div>

      <style>{`
        .faq-cats{display:flex;flex-direction:column;gap:2.5rem;margin-bottom:3rem;}
        .faq-cat-header{display:flex;align-items:center;gap:.625rem;margin-bottom:1rem;}
        .faq-cat-header span{font-size:1.3rem;}
        .faq-cat-header h2{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;color:var(--sp-text);}
        .faq-items{display:flex;flex-direction:column;gap:.625rem;}
        .faq-item{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:12px;padding:1rem 1.25rem;cursor:pointer;transition:all .2s;}
        .faq-item:hover,.faq-item.open{border-color:rgba(79,142,247,0.35);}
        .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1rem;font-size:.9rem;font-weight:600;color:var(--sp-text);}
        .faq-icon{color:#4f8ef7;font-size:1.1rem;flex-shrink:0;}
        .faq-a{font-size:.875rem;color:var(--sp-muted);line-height:1.75;margin-top:.875rem;padding-top:.875rem;border-top:1px solid var(--sp-border);}
        .faq-contact{background:var(--sp-card);border:1px solid var(--sp-border);border-radius:20px;padding:2.5rem;text-align:center;}
        .faq-contact h3{font-family:'Syne',sans-serif;font-size:1.15rem;font-weight:700;color:var(--sp-text);margin-bottom:.5rem;}
        .faq-contact p{font-size:.875rem;color:var(--sp-muted);margin-bottom:1.5rem;}
        .faq-contact-btns{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;}
        .faq-contact-btn{padding:.65rem 1.5rem;border-radius:10px;font-size:.875rem;font-weight:600;text-decoration:none;transition:all .2s;}
        .faq-contact-btn.primary{background:#4f8ef7;color:white;}
        .faq-contact-btn.primary:hover{background:#6ba3ff;transform:translateY(-1px);}
        .faq-contact-btn.ghost{border:1px solid var(--sp-border);color:var(--sp-muted);}
        .faq-contact-btn.ghost:hover{border-color:rgba(79,142,247,.35);color:var(--sp-accent);}
      `}</style>
    </StaticLayout>
  );
}
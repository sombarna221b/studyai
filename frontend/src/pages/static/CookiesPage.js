import React from 'react';
import StaticLayout from './SharedLayout';

export default function CookiesPage() {
  return (
    <StaticLayout tag="Legal" title="Cookie Policy" subtitle="We keep it simple — only the cookies we actually need.">
      <div className="prose">
        <p className="last-updated">Effective date: February 20, 2026 · Version 1.0</p>
        <div className="highlight"><p>🍪 Good news: we only use essential cookies. No tracking, no advertising, no third-party analytics cookies.</p></div>

        <h2>What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit to make your next visit easier.</p>

        <h2>Cookies We Use</h2>
        <h3>Essential Cookies (Required)</h3>
        <p>These cookies are necessary for StudyAI to function. You cannot opt out of these.</p>
        <ul>
          <li><strong>auth_token</strong> — Keeps you logged in securely. Expires after 7 days of inactivity.</li>
          <li><strong>session_id</strong> — Maintains your active session. Deleted when you close your browser.</li>
          <li><strong>csrf_token</strong> — Protects against cross-site request forgery attacks.</li>
        </ul>

        <h3>Preference Cookies (Optional)</h3>
        <p>These cookies remember your preferences to improve your experience.</p>
        <ul>
          <li><strong>theme</strong> — Remembers your light/dark mode preference.</li>
        </ul>

        <h2>What We Don't Use</h2>
        <ul>
          <li>❌ Google Analytics or any third-party analytics</li>
          <li>❌ Facebook Pixel or advertising cookies</li>
          <li>❌ Tracking or fingerprinting cookies</li>
          <li>❌ Cross-site tracking of any kind</li>
        </ul>

        <h2>Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling essential cookies will prevent StudyAI from working correctly. Here's how to manage cookies in popular browsers:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer">Safari</a></li>
        </ul>

        <h2>Contact</h2>
        <div className="highlight"><p>📧 <strong>privacy@studyai.app</strong> — For any questions about our cookie practices.</p></div>
      </div>
    </StaticLayout>
  );
}
import React from 'react';
import StaticLayout from './SharedLayout';

export default function PrivacyPage() {
  return (
    <StaticLayout tag="Legal" title="Privacy Policy" subtitle="Last updated: February 20, 2026">
      <div className="prose">
        <p className="last-updated">Effective date: February 20, 2026 · Version 1.0</p>

        <div className="highlight"><p>Your privacy matters. We built StudyAI with data protection as a core principle. This policy explains exactly what we collect, why, and how you can control it.</p></div>

        <h2>1. Information We Collect</h2>
        <h3>Account Information</h3>
        <p>When you register, we collect your <strong>full name</strong>, <strong>email address</strong>, and a hashed version of your password. We never store passwords in plain text.</p>
        <h3>Documents You Upload</h3>
        <p>PDF files you upload are stored securely and associated only with your account. We do not read, analyze, or share your documents outside of providing you the StudyAI service.</p>
        <h3>Usage Data</h3>
        <p>We collect anonymized usage data such as feature interactions, session duration, and error logs to improve the product. This data cannot be used to identify you personally.</p>

        <h2>2. How We Use Your Data</h2>
        <ul>
          <li>To provide and improve the StudyAI service</li>
          <li>To generate AI-powered flashcards, quizzes, and summaries from your documents</li>
          <li>To send important account notifications (no marketing without consent)</li>
          <li>To diagnose technical issues and improve performance</li>
        </ul>

        <h2>3. AI Processing</h2>
        <p>Your documents are processed by Google Gemini AI to power our features. This processing happens in isolated sandboxes. <strong>Your data is never used to train AI models</strong> — by us or by Google under our API agreement.</p>

        <h2>4. Data Sharing</h2>
        <p>We <strong>never sell your data</strong> to third parties. We share data only with:</p>
        <ul>
          <li><strong>Google Gemini API</strong> — to process your documents for AI features</li>
          <li><strong>MongoDB Atlas</strong> — our database provider for secure data storage</li>
          <li><strong>Cloudinary</strong> — for secure file storage and delivery</li>
        </ul>
        <p>All third-party providers are contractually bound to protect your data and are GDPR-compliant.</p>

        <h2>5. Data Retention</h2>
        <p>We retain your data for as long as your account is active. If you delete your account, all associated data — including uploaded documents, flashcards, quizzes, and profile information — is permanently deleted within 30 days.</p>

        <h2>6. Your Rights</h2>
        <p>Under GDPR and applicable laws, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Export your data in a portable format</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To exercise any of these rights, email us at <a href="mailto:privacy@studyai.app">privacy@studyai.app</a>.</p>

        <h2>7. Security</h2>
        <p>We use AES-256 encryption for data at rest and TLS for data in transit. Access to production systems is restricted, logged, and audited. We conduct regular security reviews.</p>

        <h2>8. Cookies</h2>
        <p>We use only essential cookies required for authentication and session management. We do not use advertising or tracking cookies. See our <a href="/cookies">Cookie Policy</a> for details.</p>

        <h2>9. Children's Privacy</h2>
        <p>StudyAI is not intended for children under 13. We do not knowingly collect data from anyone under 13. If you believe a child has provided us data, contact us immediately.</p>

        <h2>10. Contact Us</h2>
        <p>For any privacy-related questions or requests, contact our dedicated privacy team:</p>
        <div className="highlight"><p>📧 <strong>privacy@studyai.app</strong><br/>We aim to respond within 48 hours on business days.</p></div>
      </div>
    </StaticLayout>
  );
}
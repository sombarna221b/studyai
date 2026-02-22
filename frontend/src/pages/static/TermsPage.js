import React from 'react';
import StaticLayout from './SharedLayout';

export default function TermsPage() {
  return (
    <StaticLayout tag="Legal" title="Terms of Service" subtitle="Please read these terms carefully before using StudyAI.">
      <div className="prose">
        <p className="last-updated">Effective date: February 20, 2026 · Version 1.0</p>
        <div className="highlight"><p>By creating an account or using StudyAI, you agree to these terms. If you don't agree, please don't use the service.</p></div>

        <h2>1. Acceptance of Terms</h2>
        <p>These Terms of Service govern your use of StudyAI operated by StudyAI Technologies Pvt. Ltd. By accessing or using our service, you confirm you are at least 13 years old and agree to be bound by these terms.</p>

        <h2>2. Your Account</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use. We reserve the right to suspend accounts that violate these terms.</p>

        <h2>3. Acceptable Use</h2>
        <p>You agree NOT to:</p>
        <ul>
          <li>Upload documents containing illegal, harmful, or copyrighted content you don't own</li>
          <li>Attempt to reverse engineer, hack, or disrupt the service</li>
          <li>Use the service to generate misleading or harmful AI content</li>
          <li>Share your account credentials with others</li>
          <li>Use automated bots or scrapers on the platform</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>You retain ownership of all documents you upload. The flashcards, quizzes, and summaries generated from your documents are also yours. StudyAI retains ownership of the platform, design, and underlying technology.</p>

        <h2>5. AI-Generated Content</h2>
        <p>StudyAI uses Google Gemini AI to generate study materials. While we strive for accuracy, AI-generated content may contain errors. Always verify important information independently. StudyAI is a study aid, not a substitute for professional advice.</p>

        <h2>6. Service Availability</h2>
        <p>We aim for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance that temporarily affects availability. We are not liable for losses caused by downtime.</p>

        <h2>7. Limitation of Liability</h2>
        <p>StudyAI is provided "as is" without warranties of any kind. To the maximum extent permitted by law, StudyAI Technologies Pvt. Ltd. is not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>

        <h2>8. Termination</h2>
        <p>You may delete your account at any time. We may suspend or terminate accounts that violate these terms. Upon termination, your data will be deleted within 30 days per our Privacy Policy.</p>

        <h2>9. Changes to Terms</h2>
        <p>We may update these terms periodically. We will notify you of significant changes via email. Continued use of the service after changes constitutes acceptance of the new terms.</p>

        <h2>10. Governing Law</h2>
        <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka, India.</p>

        <h2>11. Contact</h2>
        <div className="highlight"><p>📧 <strong>legal@studyai.app</strong><br/>For any questions about these terms, reach out to our legal team.</p></div>
      </div>
    </StaticLayout>
  );
}
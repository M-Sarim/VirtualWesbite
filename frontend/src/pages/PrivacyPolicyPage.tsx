import React from "react";

const PrivacyPolicyPage: React.FC = () => (
  <main className="max-w-3xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Introduction</h2>
      <p>
        We value your privacy and are committed to protecting your personal
        data. This Privacy Policy explains how we collect, use, and safeguard
        your information in compliance with global standards, including the
        GDPR.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6">
        <li>
          Personal identification information (Name, email address, phone
          number, etc.)
        </li>
        <li>Usage data (pages visited, time spent, etc.)</li>
        <li>Cookies and tracking technologies</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">How We Use Your Data</h2>
      <ul className="list-disc pl-6">
        <li>To provide and maintain our services</li>
        <li>To improve user experience</li>
        <li>To communicate updates and offers</li>
        <li>To comply with legal obligations</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
      <ul className="list-disc pl-6">
        <li>Access, update, or delete your personal data</li>
        <li>Withdraw consent at any time</li>
        <li>Request data portability</li>
        <li>Lodge a complaint with a supervisory authority</li>
      </ul>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at privacy@virtualwebsite.com.
      </p>
    </section>
  </main>
);

export default PrivacyPolicyPage;

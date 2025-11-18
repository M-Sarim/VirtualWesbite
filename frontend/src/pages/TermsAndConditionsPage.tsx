import React from "react";

const TermsAndConditionsPage: React.FC = () => (
  <main className="max-w-3xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
      <p>
        By accessing or using our website and services, you agree to comply with
        and be bound by these Terms & Conditions.
      </p>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
      <ul className="list-disc pl-6">
        <li>Services are provided for lawful purposes only</li>
        <li>Users must not misuse or attempt to disrupt our services</li>
        <li>Account information must be accurate and kept up to date</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
      <ul className="list-disc pl-6">
        <li>All content is owned by VirtualWebsite or its licensors</li>
        <li>Unauthorized use, reproduction, or distribution is prohibited</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
      <ul className="list-disc pl-6">
        <li>We are not liable for indirect or consequential damages</li>
        <li>Service is provided "as is" without warranties of any kind</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
      <p>
        We reserve the right to update these Terms & Conditions at any time.
        Continued use of the service constitutes acceptance of the new terms.
      </p>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
      <p>
        For questions regarding these Terms & Conditions, contact us at
        legal@virtualwebsite.com.
      </p>
    </section>
  </main>
);

export default TermsAndConditionsPage;

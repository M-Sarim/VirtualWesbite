import React from "react";
import AdminLayout from "../admin/AdminLayout";

const accessibilityChecklist = [
  "Keyboard navigation for all controls",
  "ARIA labels for interactive elements",
  "Sufficient color contrast",
  "Screen reader support",
  "Resizable text and layouts",
  "Tab order and focus management",
  "Accessible modals and dialogs",
  "Alt text for images",
  "No reliance on color alone",
  "Mobile responsive layout",
  "Touch target size and spacing",
];

const AccessibilityMobilePage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Accessibility & Mobile</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Accessibility Checklist</h2>
      <ul className="list-disc ml-5">
        {accessibilityChecklist.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Mobile Responsiveness</h2>
      <ul className="list-disc ml-5">
        <li>All admin screens use responsive layouts (Tailwind grid/flex)</li>
        <li>Tested on mobile and tablet breakpoints</li>
        <li>Touch-friendly controls and spacing</li>
        <li>Hamburger menu or collapsible sidebar for small screens</li>
      </ul>
    </section>
  </AdminLayout>
);

export default AccessibilityMobilePage;

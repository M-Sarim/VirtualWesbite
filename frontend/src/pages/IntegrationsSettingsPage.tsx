import React from "react";
import AdminLayout from "../admin/AdminLayout";

// Mock integrations and settings data
const integrations = [
  {
    id: "ch",
    name: "Companies House API",
    status: "Connected",
    lastSync: "2025-11-15",
    logs: ["2025-11-15: Synced", "2025-11-10: Token refreshed"],
  },
  {
    id: "stripe",
    name: "Stripe Payments",
    status: "Connected",
    lastSync: "2025-11-16",
    logs: ["2025-11-16: Payment processed"],
  },
  {
    id: "mailgun",
    name: "Mailgun Email",
    status: "Connected",
    lastSync: "2025-11-16",
    logs: ["2025-11-16: Email sent"],
  },
];
const settings = {
  payment: { provider: "Stripe", apiKey: "sk_test_****" },
  mail: { provider: "Mailgun", domain: "mg.example.com" },
  webhooks: ["https://webhook.site/abc123"],
  toggles: { enableKYC: true, enableAutoRenew: false },
};

const IntegrationsSettingsPage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Integrations & Settings</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Integrations</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Last Sync</th>
            <th className="p-2">Logs</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {integrations.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2">{i.name}</td>
              <td className="p-2">{i.status}</td>
              <td className="p-2">{i.lastSync}</td>
              <td className="p-2">
                <ul className="list-disc ml-4">
                  {i.logs.map((log, idx) => (
                    <li key={idx}>{log}</li>
                  ))}
                </ul>
              </td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">Edit</button>
                <button className="btn btn-xs btn-outline">Logs</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Payment Settings</h2>
      <div>
        <b>Provider:</b> {settings.payment.provider}
      </div>
      <div>
        <b>API Key:</b> {settings.payment.apiKey}
      </div>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Mail Provider</h2>
      <div>
        <b>Provider:</b> {settings.mail.provider}
      </div>
      <div>
        <b>Domain:</b> {settings.mail.domain}
      </div>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Webhooks</h2>
      <ul className="list-disc ml-5">
        {settings.webhooks.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Feature Toggles</h2>
      <ul className="list-disc ml-5">
        <li>Enable KYC: {settings.toggles.enableKYC ? "On" : "Off"}</li>
        <li>
          Enable Auto-Renew: {settings.toggles.enableAutoRenew ? "On" : "Off"}
        </li>
      </ul>
    </section>
  </AdminLayout>
);

export default IntegrationsSettingsPage;

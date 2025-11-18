import React from "react";
import AdminLayout from "../admin/AdminLayout";

const notifications = [
  {
    id: "n1",
    type: "info",
    message: "New company order received.",
    date: "2025-11-17 09:00",
  },
  {
    id: "n2",
    type: "success",
    message: "KYC approved for Jane Smith.",
    date: "2025-11-17 08:45",
  },
  {
    id: "n3",
    type: "error",
    message: "Payment failed for Acme Ltd.",
    date: "2025-11-17 08:30",
  },
];
const errors = [
  {
    id: "e1",
    message: "Failed to fetch Companies House data.",
    action: "Retry",
  },
  { id: "e2", message: "Email delivery delayed.", action: "View Details" },
];
const confirmations = [
  { id: "c1", message: "Company incorporation submitted successfully." },
];
const microcopy = [
  "All changes are saved automatically.",
  "Need help? Contact support at any time.",
  "You can export data as CSV from any table.",
];

const NotificationsErrorStatesPage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Notifications & Error States</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Notifications Center</h2>
      <ul className="divide-y divide-gray-100">
        {notifications.map((n) => (
          <li key={n.id} className="py-2 flex items-center gap-3">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                n.type === "info"
                  ? "bg-blue-400"
                  : n.type === "success"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></span>
            <span>{n.message}</span>
            <span className="ml-auto text-xs text-gray-400">{n.date}</span>
          </li>
        ))}
      </ul>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Error & Confirmation Dialogs</h2>
      <div className="mb-2">
        <b>Errors:</b>
        <ul className="list-disc ml-5">
          {errors.map((e) => (
            <li key={e.id}>
              {e.message}{" "}
              <button className="btn btn-xs btn-outline ml-2">
                {e.action}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <b>Confirmations:</b>
        <ul className="list-disc ml-5">
          {confirmations.map((c) => (
            <li key={c.id}>{c.message}</li>
          ))}
        </ul>
      </div>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Microcopy</h2>
      <ul className="list-disc ml-5">
        {microcopy.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </section>
  </AdminLayout>
);

export default NotificationsErrorStatesPage;

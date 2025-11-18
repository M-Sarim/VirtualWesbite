import React from "react";

const alerts = [
  { type: "warning", text: "SLA breach: 1 formation delayed >4h." },
  { type: "info", text: "Companies House API maintenance scheduled for 8pm." },
];

export default function DashboardAlerts() {
  return (
    <section className="mb-8">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className={`rounded p-4 mb-2 text-sm font-medium ${
            alert.type === "warning"
              ? "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-400"
              : "bg-blue-100 text-blue-800 border-l-4 border-blue-400"
          }`}
        >
          {alert.text}
        </div>
      ))}
    </section>
  );
}

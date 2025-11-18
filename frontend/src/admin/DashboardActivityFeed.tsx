import React from "react";

const activities = [
  { time: "09:12", text: "Company 'Acme Ltd' incorporated by Agent Sarah." },
  { time: "09:30", text: "KYC approved for client John Doe." },
  { time: "10:01", text: "Refund issued for order #12345 by Finance." },
  { time: "10:15", text: "SLA breach: Formation for 'Beta Ltd' delayed." },
  { time: "11:00", text: "Virtual address assigned to 'Gamma Ltd'." },
];

export default function DashboardActivityFeed() {
  return (
    <section className="bg-white rounded shadow p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="divide-y divide-gray-100">
        {activities.map((a, i) => (
          <li key={i} className="py-2 flex items-start gap-3">
            <span className="text-xs text-gray-400 w-14 flex-shrink-0">
              {a.time}
            </span>
            <span className="text-gray-700 text-sm">{a.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

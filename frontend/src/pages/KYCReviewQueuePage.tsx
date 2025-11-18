import React from "react";
import AdminLayout from "../admin/AdminLayout";

// Mock KYC review queue data
const kycQueue = [
  {
    id: "k1",
    client: "John Doe",
    submitted: "2025-11-10",
    status: "Pending",
    docs: [
      { id: "d1", name: "Passport.pdf", url: "#" },
      { id: "d2", name: "UtilityBill.jpg", url: "#" },
    ],
    priority: "High",
  },
  {
    id: "k2",
    client: "Jane Smith",
    submitted: "2025-11-12",
    status: "In Review",
    docs: [{ id: "d3", name: "IDCard.pdf", url: "#" }],
    priority: "Medium",
  },
];

const KYCReviewQueuePage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">KYC & Document Review Queue</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Queue</h2>
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Client</th>
            <th className="p-2">Submitted</th>
            <th className="p-2">Status</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Documents</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kycQueue.map((k) => (
            <tr key={k.id} className="border-b">
              <td className="p-2">{k.client}</td>
              <td className="p-2">{k.submitted}</td>
              <td className="p-2">{k.status}</td>
              <td className="p-2">{k.priority}</td>
              <td className="p-2">
                {k.docs.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    className="text-blue-600 underline mr-2"
                  >
                    {doc.name}
                  </a>
                ))}
              </td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">View</button>
                <button className="btn btn-xs btn-success">Accept</button>
                <button className="btn btn-xs btn-error">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Verification Checklist</h2>
      <ul className="list-disc ml-5">
        <li>Check document authenticity</li>
        <li>Verify client identity matches documents</li>
        <li>Redact sensitive info if needed</li>
        <li>Record status transitions and timestamps</li>
      </ul>
    </section>
  </AdminLayout>
);

export default KYCReviewQueuePage;

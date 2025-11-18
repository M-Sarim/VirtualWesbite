import React from "react";
import AdminLayout from "../admin/AdminLayout";

// Mock customer data
const customer = {
  id: "1",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+44 1234 567890",
  address: "123 Main St, London, UK",
  kycStatus: "Approved",
  virtualAddresses: [
    { id: "va1", address: "Suite 100, 456 City Rd, London" },
    { id: "va2", address: "PO Box 789, Manchester" },
  ],
  orders: [
    {
      id: "o1",
      company: "Acme Ltd",
      status: "Active",
      createdAt: "2023-10-01",
    },
    {
      id: "o2",
      company: "Beta Ltd",
      status: "Pending",
      createdAt: "2023-11-05",
    },
  ],
  kycDocs: [
    { id: "doc1", name: "Passport.pdf", url: "#" },
    { id: "doc2", name: "UtilityBill.jpg", url: "#" },
  ],
  emailHistory: [
    { id: "e1", subject: "Welcome", date: "2023-10-01" },
    { id: "e2", subject: "KYC Approved", date: "2023-10-10" },
  ],
  uploadedIDs: [{ id: "id1", name: "Passport.pdf", url: "#" }],
  notes: [{ id: "n1", text: "Called to confirm address.", date: "2023-10-02" }],
  tasks: [
    { id: "t1", text: "Send welcome pack", done: false },
    { id: "t2", text: "Verify new address", done: true },
  ],
};

const CustomerProfilePage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Customer Profile</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contact Info */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Contact Info</h2>
        <div>
          <b>Name:</b> {customer.name}
        </div>
        <div>
          <b>Email:</b> {customer.email}
        </div>
        <div>
          <b>Phone:</b> {customer.phone}
        </div>
        <div>
          <b>Address:</b> {customer.address}
        </div>
        <div>
          <b>KYC Status:</b> {customer.kycStatus}
        </div>
      </section>
      {/* Virtual Addresses */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Virtual Addresses</h2>
        <ul className="list-disc ml-5">
          {customer.virtualAddresses.map((va) => (
            <li key={va.id}>{va.address}</li>
          ))}
        </ul>
      </section>
      {/* Orders */}
      <section className="bg-white rounded shadow p-4 md:col-span-2">
        <h2 className="font-semibold mb-2">Orders</h2>
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Company</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {customer.orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-2">{o.company}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">{o.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* KYC Docs */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">KYC Documents</h2>
        <ul className="list-disc ml-5">
          {customer.kycDocs.map((doc) => (
            <li key={doc.id}>
              <a href={doc.url} className="text-blue-600 underline">
                {doc.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
      {/* Email History */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Email History</h2>
        <ul className="list-disc ml-5">
          {customer.emailHistory.map((e) => (
            <li key={e.id}>
              {e.subject}{" "}
              <span className="text-xs text-gray-400">({e.date})</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Uploaded IDs */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Uploaded IDs</h2>
        <ul className="list-disc ml-5">
          {customer.uploadedIDs.map((id) => (
            <li key={id.id}>
              <a href={id.url} className="text-blue-600 underline">
                {id.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
      {/* Notes */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Notes</h2>
        <ul className="list-disc ml-5">
          {customer.notes.map((n) => (
            <li key={n.id}>
              {n.text} <span className="text-xs text-gray-400">({n.date})</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Tasks */}
      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Tasks</h2>
        <ul className="list-disc ml-5">
          {customer.tasks.map((t) => (
            <li
              key={t.id}
              className={t.done ? "line-through text-gray-400" : ""}
            >
              {t.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  </AdminLayout>
);

export default CustomerProfilePage;

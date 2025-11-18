import React from "react";
import AdminLayout from "../admin/AdminLayout";

// Mock billing and payments data
const invoices = [
  {
    id: "inv1",
    client: "John Doe",
    amount: "£120.00",
    status: "Paid",
    date: "2025-10-01",
  },
  {
    id: "inv2",
    client: "Jane Smith",
    amount: "£80.00",
    status: "Pending",
    date: "2025-11-05",
  },
];
const refunds = [
  {
    id: "ref1",
    client: "Acme Ltd",
    amount: "£40.00",
    status: "Processed",
    date: "2025-10-15",
  },
];
const vatTasks = [
  {
    id: "vat1",
    description: "Submit Q4 VAT return",
    due: "2025-12-31",
    status: "Open",
  },
];

const BillingPaymentsPage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Billing & Payments</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Invoices</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Client</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b">
              <td className="p-2">{inv.client}</td>
              <td className="p-2">{inv.amount}</td>
              <td className="p-2">{inv.status}</td>
              <td className="p-2">{inv.date}</td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">View</button>
                <button className="btn btn-xs btn-outline">Export</button>
                <button className="btn btn-xs btn-error">Refund</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sm btn-success">+ New Invoice</button>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Refunds</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Client</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((ref) => (
            <tr key={ref.id} className="border-b">
              <td className="p-2">{ref.client}</td>
              <td className="p-2">{ref.amount}</td>
              <td className="p-2">{ref.status}</td>
              <td className="p-2">{ref.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">VAT Tasks</h2>
      <ul className="list-disc ml-5">
        {vatTasks.map((t) => (
          <li key={t.id}>
            {t.description}{" "}
            <span className="text-xs text-gray-400">
              (Due: {t.due}, Status: {t.status})
            </span>
          </li>
        ))}
      </ul>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">CSV Export</h2>
      <button className="btn btn-sm btn-outline">
        Export All Transactions
      </button>
    </section>
  </AdminLayout>
);

export default BillingPaymentsPage;

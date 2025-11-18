import React from "react";
import AdminLayout from "../admin/AdminLayout";

// Mock address inventory and assignment history
type Address = {
  id: string;
  address: string;
  assignedTo?: string;
  status: string;
  price: string;
  expiry?: string;
};
const addresses: Address[] = [
  {
    id: "a1",
    address: "Suite 100, 456 City Rd, London",
    assignedTo: "John Doe",
    status: "Active",
    price: "£20/mo",
    expiry: "2026-01-01",
  },
  {
    id: "a2",
    address: "PO Box 789, Manchester",
    status: "Available",
    price: "£15/mo",
  },
  {
    id: "a3",
    address: "Flat 2, 12 Baker St, London",
    assignedTo: "Jane Smith",
    status: "Expiring Soon",
    price: "£18/mo",
    expiry: "2025-12-01",
  },
];

const VirtualAddressManagementPage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Virtual Address Management</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Address Inventory</h2>
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Address</th>
            <th className="p-2">Assigned To</th>
            <th className="p-2">Status</th>
            <th className="p-2">Price</th>
            <th className="p-2">Expiry</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.address}</td>
              <td className="p-2">
                {a.assignedTo || (
                  <span className="text-gray-400">Unassigned</span>
                )}
              </td>
              <td className="p-2">{a.status}</td>
              <td className="p-2">{a.price}</td>
              <td className="p-2">
                {a.expiry || <span className="text-gray-400">-</span>}
              </td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">Assign</button>
                <button className="btn btn-xs btn-secondary">History</button>
                <button className="btn btn-xs btn-outline">Renew</button>
                <button className="btn btn-xs btn-error">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Assignment History</h2>
      <ul className="list-disc ml-5">
        <li>2025-10-01: Suite 100, 456 City Rd assigned to John Doe</li>
        <li>2025-09-15: Flat 2, 12 Baker St assigned to Jane Smith</li>
        <li>2025-08-20: PO Box 789 assigned to Acme Ltd</li>
      </ul>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Mail Forwarding & Renewals</h2>
      <ul className="list-disc ml-5">
        <li>Mail forwarding enabled for Suite 100, 456 City Rd</li>
        <li>Renewal due for Flat 2, 12 Baker St on 2025-12-01</li>
      </ul>
    </section>
  </AdminLayout>
);

export default VirtualAddressManagementPage;

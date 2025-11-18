import React from "react";
import AdminLayout from "../admin/AdminLayout";

// Mock users, roles, and activity log data
const users = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@site.com",
    role: "Admin",
    lastLogin: "2025-11-16",
    twoFA: true,
  },
  {
    id: "u2",
    name: "Agent Smith",
    email: "agent@site.com",
    role: "Agent",
    lastLogin: "2025-11-15",
    twoFA: false,
  },
  {
    id: "u3",
    name: "Finance Jones",
    email: "finance@site.com",
    role: "Finance",
    lastLogin: "2025-11-14",
    twoFA: true,
  },
];
const activityLog = [
  {
    id: "a1",
    user: "Admin User",
    action: "Created company Acme Ltd",
    date: "2025-11-15 10:00",
  },
  {
    id: "a2",
    user: "Agent Smith",
    action: "Reviewed KYC for John Doe",
    date: "2025-11-15 11:00",
  },
  {
    id: "a3",
    user: "Finance Jones",
    action: "Issued refund for Beta Ltd",
    date: "2025-11-15 12:00",
  },
];

const UsersRolesActivityLogPage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Users, Roles & Activity Log</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Users & Roles</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Last Login</th>
            <th className="p-2">2FA</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.lastLogin}</td>
              <td className="p-2">{u.twoFA ? "Enabled" : "Disabled"}</td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">Edit</button>
                <button className="btn btn-xs btn-error">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sm btn-success">+ New User</button>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Activity Log</h2>
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">User</th>
            <th className="p-2">Action</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {activityLog.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.user}</td>
              <td className="p-2">{a.action}</td>
              <td className="p-2">{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </AdminLayout>
);

export default UsersRolesActivityLogPage;

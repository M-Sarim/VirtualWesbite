import React from "react";
import AdminLayout from "../admin/AdminLayout";

// Mock packages and pricing data
const packages = [
  {
    id: "p1",
    name: "Digital",
    price: "£50",
    description: "Digital company formation",
  },
  {
    id: "p2",
    name: "Print",
    price: "£60",
    description: "Printed documents included",
  },
  {
    id: "p3",
    name: "Privacy",
    price: "£70",
    description: "Privacy address included",
  },
  {
    id: "p4",
    name: "International",
    price: "£90",
    description: "International clients supported",
  },
];
const addOns = [
  { id: "a1", name: "Mail Forwarding", price: "£20/mo" },
  { id: "a2", name: "Registered Agent", price: "£15/mo" },
];
const discounts = [{ id: "d1", code: "WELCOME10", amount: "10%" }];
const promoCodes = [{ id: "pr1", code: "BLACKFRIDAY", amount: "20%" }];

const PackagesPricingPage: React.FC = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-4">Packages & Pricing</h1>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Packages</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.price}</td>
              <td className="p-2">{p.description}</td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sm btn-success">+ New Package</button>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Add-Ons</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {addOns.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.price}</td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sm btn-success">+ New Add-On</button>
    </section>
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="font-semibold mb-2">Discounts</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Code</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map((d) => (
            <tr key={d.id} className="border-b">
              <td className="p-2">{d.code}</td>
              <td className="p-2">{d.amount}</td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sm btn-success">+ New Discount</button>
    </section>
    <section className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Promo Codes</h2>
      <table className="min-w-full table-auto text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Code</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promoCodes.map((pr) => (
            <tr key={pr.id} className="border-b">
              <td className="p-2">{pr.code}</td>
              <td className="p-2">{pr.amount}</td>
              <td className="p-2 flex gap-1">
                <button className="btn btn-xs btn-primary">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-sm btn-success">+ New Promo Code</button>
    </section>
  </AdminLayout>
);

export default PackagesPricingPage;

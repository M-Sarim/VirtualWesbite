import React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use current path to highlight active nav
  const active = window.location.pathname;
  return (
    <div className="flex min-h-screen bg-[#F6F7FB]">
      <AdminSidebar active={active} />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

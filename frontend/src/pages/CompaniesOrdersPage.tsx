import React, { useState } from "react";
import {
  CompaniesOrdersTable,
  CompanyOrder,
} from "../admin/CompaniesOrdersTable";
import AdminLayout from "../admin/AdminLayout";
import {
  IncorporationStepperModal,
  IncorporationDraft,
} from "../admin/IncorporationStepperModal";

// Mock fetchData function (replace with real API call later)
const mockData: CompanyOrder[] = Array.from({ length: 37 }).map((_, i) => ({
  id: String(i + 1),
  companyName: `Company ${i + 1}`,
  client: `Client ${(i % 5) + 1}`,
  package: ["Digital", "Print", "Privacy", "International"][i % 4],
  status: ["Pending", "Active", "Cancelled"][i % 3],
  country: ["UK", "US", "DE", "FR"][i % 4],
  kycStatus: ["Pending", "Approved", "Rejected"][i % 3],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

const fetchData = async (
  filters: Record<string, string | undefined>,
  page: number,
  pageSize: number
) => {
  // Filter mock data
  let filtered = mockData.filter((row) => {
    return (
      (!filters.companyName ||
        row.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())) &&
      (!filters.client ||
        row.client.toLowerCase().includes(filters.client.toLowerCase())) &&
      (!filters.package || row.package === filters.package) &&
      (!filters.status || row.status === filters.status) &&
      (!filters.country ||
        row.country.toLowerCase().includes(filters.country.toLowerCase())) &&
      (!filters.kycStatus || row.kycStatus === filters.kycStatus) &&
      (!filters.createdAt || row.createdAt.slice(0, 10) === filters.createdAt)
    );
  });
  const total = filtered.length;
  const data = filtered.slice((page - 1) * pageSize, page * pageSize);
  await new Promise((r) => setTimeout(r, 300)); // Simulate network
  return { data, total };
};

const CompaniesOrdersPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalSubmit = (draft: IncorporationDraft) => {
    setModalOpen(false);
    // TODO: Save draft to backend or update table
    alert("Incorporation submitted! (see console)");
    console.log("Submitted incorporation:", draft);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Companies & Orders</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + New Incorporation
        </button>
      </div>
      <CompaniesOrdersTable fetchData={fetchData} />
      <IncorporationStepperModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </AdminLayout>
  );
};

export default CompaniesOrdersPage;

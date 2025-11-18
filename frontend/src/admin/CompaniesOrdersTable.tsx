import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface CompanyOrder {
  id: string;
  companyName: string;
  client: string;
  package: string;
  status: string;
  country: string;
  kycStatus: string;
  createdAt: string;
}

interface CompaniesOrdersTableProps {
  fetchData: (
    filters: Record<string, string | undefined>,
    page: number,
    pageSize: number
  ) => Promise<{
    data: CompanyOrder[];
    total: number;
  }>;
}

const PAGE_SIZE = 10;

export const CompaniesOrdersTable: React.FC<CompaniesOrdersTableProps> = ({
  fetchData,
}) => {
  const [filters, setFilters] = useState<Record<string, string | undefined>>(
    {}
  );
  const [data, setData] = useState<CompanyOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchData(filters, page, PAGE_SIZE).then(({ data, total }) => {
      setData(data);
      setTotal(total);
      setLoading(false);
    });
  }, [filters, page, fetchData]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value || undefined });
    setPage(1);
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          name="companyName"
          placeholder="Company"
          className="input input-bordered"
          onChange={handleFilterChange}
        />
        <input
          name="client"
          placeholder="Client"
          className="input input-bordered"
          onChange={handleFilterChange}
        />
        <select
          name="package"
          className="input input-bordered"
          onChange={handleFilterChange}
        >
          <option value="">All Packages</option>
          <option value="Digital">Digital</option>
          <option value="Print">Print</option>
          <option value="Privacy">Privacy</option>
          <option value="International">International</option>
        </select>
        <select
          name="status"
          className="input input-bordered"
          onChange={handleFilterChange}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          name="country"
          placeholder="Country"
          className="input input-bordered"
          onChange={handleFilterChange}
        />
        <select
          name="kycStatus"
          className="input input-bordered"
          onChange={handleFilterChange}
        >
          <option value="">KYC Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          name="createdAt"
          type="date"
          className="input input-bordered"
          onChange={handleFilterChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Company</th>
              <th className="p-2">Client</th>
              <th className="p-2">Package</th>
              <th className="p-2">Status</th>
              <th className="p-2">Country</th>
              <th className="p-2">KYC</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  No results
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="p-2">{row.companyName}</td>
                  <td className="p-2">{row.client}</td>
                  <td className="p-2">{row.package}</td>
                  <td className="p-2">{row.status}</td>
                  <td className="p-2">{row.country}</td>
                  <td className="p-2">{row.kycStatus}</td>
                  <td className="p-2">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 flex gap-1">
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => navigate(`/admin/customer/${row.id}`)}
                    >
                      View
                    </button>
                    <button className="btn btn-xs btn-secondary">Edit</button>
                    <button className="btn btn-xs btn-info">Reminder</button>
                    <button className="btn btn-xs btn-error">Cancel</button>
                    <button className="btn btn-xs btn-outline">Export</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>
          Page {page} of {Math.ceil(total / PAGE_SIZE) || 1}
        </span>
        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <button
            className="btn btn-sm"
            disabled={page * PAGE_SIZE >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

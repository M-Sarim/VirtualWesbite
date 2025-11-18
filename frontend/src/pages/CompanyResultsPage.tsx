import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/header";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  searchCompanies,
  CompanySearchResult,
} from "@/lib/services/companiesHouse";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CompanyResultsPage() {
  const query = useQuery();
  const searchTerm = query.get("query") || "";
  const [results, setResults] = useState<CompanySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [advancedFields, setAdvancedFields] = useState({
    companyNumber: "",
    address: "",
    incorporationFrom: "",
    incorporationTo: "",
  });

  // Simulate backend pagination/filtering for demo
  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    setError("");
    searchCompanies(searchTerm)
      .then((data) => {
        let filtered = data;
        if (statusFilter.length > 0) {
          filtered = filtered.filter((r: any) =>
            statusFilter.includes((r.company_status || "").toLowerCase())
          );
        }
        // Advanced search simulation
        if (advancedFields.companyNumber) {
          filtered = filtered.filter((r: any) =>
            r.company_number?.includes(advancedFields.companyNumber)
          );
        }
        if (advancedFields.address) {
          filtered = filtered.filter((r: any) =>
            (r.address_snippet || "")
              .toLowerCase()
              .includes(advancedFields.address.toLowerCase())
          );
        }
        // Sorting
        if (sortBy === "name-asc") {
          filtered = filtered
            .slice()
            .sort((a: any, b: any) => a.title.localeCompare(b.title));
        } else if (sortBy === "name-desc") {
          filtered = filtered
            .slice()
            .sort((a: any, b: any) => b.title.localeCompare(a.title));
        } else if (sortBy === "date-newest") {
          filtered = filtered
            .slice()
            .sort((a: any, b: any) =>
              (b.date_of_creation || "").localeCompare(a.date_of_creation || "")
            );
        } else if (sortBy === "date-oldest") {
          filtered = filtered
            .slice()
            .sort((a: any, b: any) =>
              (a.date_of_creation || "").localeCompare(b.date_of_creation || "")
            );
        }
        setTotalResults(filtered.length);
        setResults(
          filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        );
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [searchTerm, statusFilter, sortBy, currentPage, pageSize, advancedFields]);

  return (
    <div className="min-h-screen w-full bg-white pb-8">
      <Header />
      {/* Breadcrumbs */}
      <nav className="w-full px-8 pt-32 pb-2 text-sm text-[#A3A8B0] flex items-center gap-2">
        <Link to="/" className="hover:text-[#D30B5F] font-semibold">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-[#D30B5F] font-semibold">
          Company Search Results
        </span>
      </nav>
      {/* Top Navigation Tabs */}
      <div className="border-b border-[#f3e0ea] flex items-center px-8 pt-6 w-full bg-white/80 backdrop-blur-sm">
        <Link
          to="#"
          className="text-[#D30B5F] font-semibold px-4 pb-3 border-b-2 border-[#D30B5F] mr-2"
        >
          All
        </Link>
        <Link
          to="#"
          className="text-[#D30B5F] font-medium px-4 pb-3 hover:text-[#FF7900] transition-colors"
        >
          Companies
        </Link>
        <Link
          to="#"
          className="text-[#D30B5F] font-medium px-4 pb-3 hover:text-[#FF7900] transition-colors"
        >
          Officers
        </Link>
        <Link
          to="#"
          className="text-[#D30B5F] font-medium px-4 pb-3 hover:text-[#FF7900] transition-colors"
        >
          Disqualifications
        </Link>
      </div>
      <div className="pt-6 pb-8 px-2 sm:px-8 w-full">
        {/* Filters, Sorting, Advanced Search Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-[#D30B5F] text-[#D30B5F] bg-white hover:bg-[#f3e0ea] transition text-sm font-semibold"
              onClick={() => setShowFilters((v) => !v)}
            >
              <Filter className="w-4 h-4" /> Filters
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-[#D30B5F] text-[#D30B5F] bg-white hover:bg-[#f3e0ea] transition text-sm font-semibold"
              onClick={() => setShowAdvanced((v) => !v)}
            >
              <Search className="w-4 h-4" /> Advanced Search
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              className="border rounded px-2 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="date-newest">Newest</option>
              <option value="date-oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Collapsible Filters */}
        {showFilters && (
          <div className="mb-4 flex flex-wrap gap-2 items-center bg-[#f5f8fd] p-3 rounded-lg border border-[#e0e7ef]">
            {["active", "dissolved", "liquidation"].map((status) => (
              <button
                key={status}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-semibold border transition",
                  statusFilter.includes(status)
                    ? "bg-[#D30B5F] text-white border-[#D30B5F]"
                    : "bg-white text-[#D30B5F] border-[#D30B5F] hover:bg-[#f3e0ea]"
                )}
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev.includes(status)
                      ? prev.filter((s) => s !== status)
                      : [...prev, status]
                  )
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
            <button
              className="ml-2 text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
              onClick={() => setStatusFilter([])}
              title="Clear filters"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          </div>
        )}

        {/* Collapsible Advanced Search */}
        {showAdvanced && (
          <div className="mb-4 bg-[#f5f8fd] p-3 rounded-lg border border-[#e0e7ef] flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Company Number"
                className="border rounded px-2 py-1 text-sm flex-1"
                value={advancedFields.companyNumber}
                onChange={(e) =>
                  setAdvancedFields((f) => ({
                    ...f,
                    companyNumber: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Address contains..."
                className="border rounded px-2 py-1 text-sm flex-1"
                value={advancedFields.address}
                onChange={(e) =>
                  setAdvancedFields((f) => ({ ...f, address: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                placeholder="Incorporation from"
                className="border rounded px-2 py-1 text-sm flex-1"
                value={advancedFields.incorporationFrom}
                onChange={(e) =>
                  setAdvancedFields((f) => ({
                    ...f,
                    incorporationFrom: e.target.value,
                  }))
                }
              />
              <input
                type="date"
                placeholder="Incorporation to"
                className="border rounded px-2 py-1 text-sm flex-1"
                value={advancedFields.incorporationTo}
                onChange={(e) =>
                  setAdvancedFields((f) => ({
                    ...f,
                    incorporationTo: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-1 rounded bg-[#D30B5F] text-white font-semibold text-sm hover:bg-[#b30a4c] transition"
                onClick={() => setCurrentPage(1)}
              >
                Apply
              </button>
              <button
                className="px-4 py-1 rounded bg-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-300 transition"
                onClick={() =>
                  setAdvancedFields({
                    companyNumber: "",
                    address: "",
                    incorporationFrom: "",
                    incorporationTo: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </div>
        )}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {searchTerm && (
            <div className="text-2xl font-bold text-[#262626] bg-white/80 px-4 py-2 rounded shadow-sm border border-[#f3e0ea]">
              Showing results for:{" "}
              <span className="text-[#D30B5F]">{searchTerm}</span>
            </div>
          )}
        </div>
        {/* Loading effect removed for smooth experience */}
        {error && (
          <div className="bg-red-100 text-red-700 py-3 px-4 rounded-lg mb-4 text-base font-medium border border-red-200 shadow-sm">
            {error}
          </div>
        )}
        {results.length > 0 && (
          <>
            <ul className="divide-y divide-[#e0e7ef]">
              {results.map((result) => {
                // Status color for text only
                let statusColor = "text-gray-500";
                if (result.company_status?.toLowerCase() === "active") {
                  statusColor = "text-green-700";
                } else if (
                  result.company_status?.toLowerCase() === "dissolved"
                ) {
                  statusColor = "text-red-700";
                } else if (
                  result.company_status?.toLowerCase().includes("liquidation")
                ) {
                  statusColor = "text-yellow-700";
                }
                // Status text
                let statusText = result.company_status
                  ? result.company_status.charAt(0).toUpperCase() +
                    result.company_status.slice(1).replace(/_/g, " ")
                  : "";
                // Status date
                let statusDate = null;
                if (
                  result.company_status?.toLowerCase() === "dissolved" &&
                  result.date_of_cessation
                ) {
                  statusDate = `on ${result.date_of_cessation}`;
                } else if (
                  result.company_status?.toLowerCase() === "active" &&
                  result.date_of_creation
                ) {
                  statusDate = `since ${result.date_of_creation}`;
                } else if (result.date_of_creation) {
                  statusDate = `since ${result.date_of_creation}`;
                }
                return (
                  <li
                    key={result.company_number}
                    className="py-4 transition hover:bg-[#f5f8fd] rounded-lg px-2 sm:px-4 cursor-pointer"
                  >
                    {/* Company Name */}
                    <h3 className="text-lg md:text-xl font-bold">
                      <a
                        href={`https://find-and-update.company-information.service.gov.uk/company/${result.company_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D30B5F] hover:underline focus:underline"
                      >
                        {result.title}
                      </a>
                    </h3>
                    {/* Company Number and Status on same line */}
                    <div className="flex flex-wrap items-baseline gap-x-2 text-sm text-gray-500 mt-0.5">
                      <span className="font-mono text-xs">
                        {result.company_number}
                      </span>
                      {result.company_status && (
                        <span className={`italic ${statusColor} text-xs`}>
                          {statusText}
                          {statusDate && (
                            <span className="not-italic font-normal text-gray-500 ml-1">
                              {statusDate}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                    {/* Address */}
                    <p className="text-sm text-gray-700 mt-0.5 mb-0.5 whitespace-pre-line break-words">
                      {result.address_snippet}
                    </p>
                    {/* Previous Names */}
                    {result.previous_company_names &&
                      result.previous_company_names.length > 0 && (
                        <div className="mt-2 mb-1 border-l-4 border-[#b3c6e6] bg-[#f5f8fd] pl-3 py-1 text-xs">
                          <span className="text-gray-500">
                            Matching previous names:
                          </span>
                          <div className="mt-0.5">
                            {result.previous_company_names.map(
                              (prev: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="font-semibold text-[#1976d2] tracking-wide"
                                >
                                  {prev.name}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </li>
                );
              })}
            </ul>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="p-2 rounded-full border border-gray-300 bg-white hover:bg-[#f3e0ea] disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-semibold">
                Page {currentPage} of{" "}
                {Math.max(1, Math.ceil(totalResults / pageSize))}
              </span>
              <button
                className="p-2 rounded-full border border-gray-300 bg-white hover:bg-[#f3e0ea] disabled:opacity-50"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= Math.ceil(totalResults / pageSize)}
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
        {!loading && !error && results.length === 0 && searchTerm && (
          <div className="text-center text-gray-400 text-base font-medium py-8">
            <span className="inline-flex items-center gap-2">
              <X className="w-5 h-5" /> No results found. Try adjusting your
              filters or search terms.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

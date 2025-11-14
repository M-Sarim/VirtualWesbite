import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/header";

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

  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    setError("");
    searchCompanies(searchTerm)
      .then(setResults)
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, [searchTerm]);

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
      <div className="pt-6 pb-8 px-8 w-full">
        <h1 className="text-3xl font-extrabold mb-4 text-[#D30B5F] tracking-tight text-center drop-shadow-sm uppercase letter-spacing-wide">
          Company Search Results
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {searchTerm && (
            <div className="text-2xl font-bold text-[#262626] bg-white/80 px-4 py-2 rounded shadow-sm border border-[#f3e0ea]">
              Showing results for:{" "}
              <span className="text-[#D30B5F]">{searchTerm}</span>
            </div>
          )}
        </div>
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-4 border-[#D30B5F] border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-[#D30B5F] font-semibold">
              Loading...
            </span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 py-3 px-4 rounded-lg mb-4 text-base font-medium border border-red-200 shadow-sm">
            {error}
          </div>
        )}
        {results.length > 0 && (
          <ul className="divide-y divide-[#e0e7ef]">
            {results.map((result) => {
              // Status color for text only
              let statusColor = "text-gray-500";
              if (result.company_status?.toLowerCase() === "active") {
                statusColor = "text-green-700";
              } else if (result.company_status?.toLowerCase() === "dissolved") {
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
                <li key={result.company_number} className="py-4">
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
        )}
        {!loading && !error && results.length === 0 && searchTerm && (
          <div className="text-center text-gray-400 text-base font-medium py-8">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}

/// <reference types="vite/client" />
import { useState } from "react";

export default function CompaniesSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleCompanySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSearchResults([]);
    if (!searchTerm) return;
    setSearchLoading(true);
    try {
      const response = await fetch(
        `/api/companies-house?q=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) throw new Error("Failed to fetch company data");
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error: any) {
      setSearchError(error.message || "Unknown error");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#D30B5F]">
          Companies House Search
        </h1>
        <form onSubmit={handleCompanySearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search UK companies (Companies House)"
            className="flex-1 px-3 py-2 border rounded shadow-sm text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#D30B5F] text-white rounded font-semibold"
            disabled={searchLoading}
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </form>
        {searchError && (
          <div className="bg-red-100 text-red-700 py-2 px-3 rounded mb-2 text-sm">
            {searchError}
          </div>
        )}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Results</h2>
            <ul className="divide-y divide-gray-200">
              {searchResults.map((result) => (
                <li key={result.company_number} className="py-2">
                  <div className="font-semibold">{result.title}</div>
                  <div className="text-xs text-gray-600 mb-1">
                    {result.company_number}
                  </div>
                  <div className="text-xs text-gray-500">
                    {result.address_snippet}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Status: {result.company_status}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import {
  searchCompanies,
  fetchCompanyDetails,
  type CompanySearchResult,
  type CompanyDetails,
} from "@/lib/services/companiesHouse";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<CompanySearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyDetails | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);

  const handleSearch = async () => {
    console.log("handleSearch called!");
    console.log("Search query:", searchQuery);

    if (!searchQuery.trim()) {
      console.log("Empty search query, returning");
      return;
    }

    console.log("Setting isSearching to true");
    setIsSearching(true);
    setError(null);
    setShowResults(false);
    setShowDetails(false);
    setSelectedCompany(null);

    try {
      console.log("Starting search for:", searchQuery);
      const results = await searchCompanies(searchQuery);
      console.log("Search results:", results);
      setSearchResults(results);
      setShowResults(true);
    } catch (err) {
      console.error("Search error:", err);

      // Check if it's a CORS error
      const errorMessage = err instanceof Error ? err.message : String(err);

      if (errorMessage.includes("CORS")) {
        setError(
          "Due to browser restrictions, opening Companies House website..."
        );

        // Open Companies House in new tab as fallback
        setTimeout(() => {
          window.open(
            `https://find-and-update.company-information.service.gov.uk/search?q=${encodeURIComponent(
              searchQuery
            )}`,
            "_blank"
          );
        }, 1500);
      } else {
        setError("Unable to search Companies House. Please try again later.");
      }
    } finally {
      console.log("Setting isSearching to false");
      setIsSearching(false);
    }
  };

  const handleViewDetails = async (company: CompanySearchResult) => {
    setIsSearching(true);
    try {
      const details = await fetchCompanyDetails(company.url);
      if (details) {
        setSelectedCompany(details);
        setShowDetails(true);
        setShowResults(false);
      } else {
        setError("Could not retrieve company details.");
      }
    } catch (err) {
      setError("Failed to load company details.");
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-[140px] sm:pt-[160px] lg:pt-[180px] w-full"
    >
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 w-full"
          >
            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4 w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
                Company Formation
                <br />
                Made Effortless
                <br />
                <span className="text-[#FF7900]">From £2.48</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
                Set up a Limited Company with the UK's leading award-winning
                company registration expert. It's quick and easy. Our team does
                it all.
              </p>
            </div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-full shadow-2xl p-2 flex items-center gap-2 max-w-2xl w-full"
            >
              <input
                type="text"
                placeholder="Enter your company name here..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm sm:text-base text-gray-700 placeholder-gray-400 min-w-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSearching}
              />

              <Button
                size="lg"
                className="rounded-full bg-[#D40E60] hover:bg-[#B00D50] text-white w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
                onClick={handleSearch}
                aria-label="Search"
                aria-busy={isSearching}
                disabled={isSearching || !searchQuery.trim()}
                type="button"
              >
                {isSearching ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="sr-only">Search</span>
              </Button>
            </motion.div>

            {/* Search Results */}
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-2xl max-h-[400px] sm:max-h-[500px] overflow-y-auto w-full"
              >
                {error ? (
                  <div className="flex items-center gap-3 text-yellow-600">
                    <AlertCircle className="w-5 h-5" />
                    <p>{error}</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <p className="font-semibold text-lg">
                        "{searchQuery}" is available!
                      </p>
                      <p className="text-sm text-gray-600">
                        This company name appears to be available for
                        registration.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 text-orange-600 mb-4">
                      <XCircle className="w-6 h-6" />
                      <div>
                        <p className="font-semibold text-lg">
                          {searchResults.length} companies found
                        </p>
                        <p className="text-sm text-gray-600">
                          Similar companies already exist
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {searchResults.slice(0, 10).map((company, idx) => (
                        <div
                          key={idx}
                          className="border-l-4 border-gray-300 pl-4 py-2 hover:border-[#D40E60] transition-colors cursor-pointer"
                          onClick={() => handleViewDetails(company)}
                        >
                          <p className="font-semibold text-gray-900">
                            {company.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Company #{company.company_number || "N/A"} •{" "}
                            {company.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            {company.incorporated_on &&
                              `Incorporated: ${company.incorporated_on} • `}
                            {company.address}
                          </p>
                          {company.previous_names.length > 0 && (
                            <p className="text-xs text-purple-600 mt-1">
                              Previous: {company.previous_names.join(", ")}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Click on a company to view detailed information
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Company Details Modal */}
            {showDetails && selectedCompany && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl max-h-[500px] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedCompany.name}
                  </h3>
                  <button
                    onClick={() => {
                      setShowDetails(false);
                      setShowResults(true);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 font-medium">
                        Company Number:
                      </p>
                      <p className="font-semibold">
                        {selectedCompany.company_number || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 font-medium">Status:</p>
                      <p className="font-semibold">{selectedCompany.status}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 font-medium">Company Type:</p>
                    <p className="font-semibold">
                      {selectedCompany.company_type || "N/A"}
                    </p>
                  </div>

                  {selectedCompany.incorporated_on && (
                    <div>
                      <p className="text-gray-600 font-medium">
                        Incorporated On:
                      </p>
                      <p className="font-semibold">
                        {selectedCompany.incorporated_on}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-gray-600 font-medium">
                      Registered Office:
                    </p>
                    <p className="font-semibold">
                      {selectedCompany.registered_office_address ||
                        selectedCompany.address}
                    </p>
                  </div>

                  {selectedCompany.nature_of_business.length > 0 && (
                    <div>
                      <p className="text-gray-600 font-medium mb-2">
                        Nature of Business:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedCompany.nature_of_business.map((sic, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            {sic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCompany.previous_names_full.length > 0 && (
                    <div>
                      <p className="text-gray-600 font-medium mb-2">
                        Previous Names:
                      </p>
                      <ul className="space-y-1">
                        {selectedCompany.previous_names_full.map(
                          (prev, idx) => (
                            <li key={idx} className="text-sm text-gray-700">
                              {prev.name}{" "}
                              <span className="text-gray-500">
                                ({prev.period})
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedCompany.accounts &&
                    (selectedCompany.accounts.first_accounts_made_up_to ||
                      selectedCompany.accounts.due_by) && (
                      <div>
                        <p className="text-gray-600 font-medium mb-2">
                          Accounts:
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          {selectedCompany.accounts
                            .first_accounts_made_up_to && (
                            <p>
                              Made up to:{" "}
                              {
                                selectedCompany.accounts
                                  .first_accounts_made_up_to
                              }
                            </p>
                          )}
                          {selectedCompany.accounts.due_by && (
                            <p>Due by: {selectedCompany.accounts.due_by}</p>
                          )}
                        </div>
                      </div>
                    )}

                  <div className="pt-4 border-t">
                    <a
                      href={selectedCompany.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#D40E60] hover:underline font-medium"
                    >
                      View on Companies House
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button
                    onClick={() => {
                      setShowDetails(false);
                      setShowResults(true);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Back to Results
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDetails(false);
                      setShowResults(false);
                      setSearchQuery("");
                    }}
                    className="flex-1 bg-[#D40E60] hover:bg-[#B00D50]"
                  >
                    New Search
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {/* Company Info Text */}
              <p className="text-sm text-gray-600 leading-relaxed">
                Companies open a bank account faster or equal chance of knowing
                partners. Choose a product banking partner during the process.
                Get up to £75K Cash Back.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Building Image with Badge */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block w-full"
          >
            {/* Building Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full">
              <img
                src="/src/images/building.png"
                alt="UK Business Building"
                className="w-full h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Today's Stats Badge */}
              {/* ...removed Today's Stats Badge... */}
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Cards removed as requested */}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  Star,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

interface CompanyResult {
  company_number: string;
  title: string;
  company_status: string;
  date_of_creation: string;
  address_snippet: string;
}

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<CompanyResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    setShowResults(false);

    try {
      // Use Companies House API with Basic Authentication
      // Replace 'my_api_key' with your actual API key from https://developer.company-information.service.gov.uk/
      const apiKey = "my_api_key"; // Replace with your actual API key

      // Encode API key in base64 for Basic Auth (API key + colon)
      const encodedAuth = btoa(`${apiKey}:`);

      const response = await fetch(
        `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${encodedAuth}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }

      const data = await response.json();
      setSearchResults(data.items || []);
      setShowResults(true);
    } catch (err) {
      setError("Unable to search. Opening Companies House website...");
      // Fallback to opening in new tab
      setTimeout(() => {
        window.open(
          `https://find-and-update.company-information.service.gov.uk/search?q=${encodeURIComponent(
            searchQuery
          )}`,
          "_blank"
        );
      }, 1000);
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
      className="relative min-h-screen overflow-hidden pt-[180px]"
    >
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                Company Formation
                <br />
                Made Effortless
                <br />
                <span className="text-[#FF7900]">From £2.48</span>
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
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
              className="bg-white rounded-full shadow-2xl p-2 flex items-center gap-2 max-w-2xl"
            >
              <input
                type="text"
                placeholder="Enter your company name here..."
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />

              <Button
                size="lg"
                className="rounded-full bg-[#D40E60] hover:bg-[#D40E60] text-white w-12 h-12 p-0 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSearch}
                aria-label="Search"
                aria-busy={isSearching}
                disabled={isSearching}
              >
                {/* Icon-only button for visual users; keep hidden text for screen readers */}
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </Button>
            </motion.div>

            {/* Search Results */}
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6 max-w-2xl"
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
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                      <XCircle className="w-6 h-6" />
                      <div>
                        <p className="font-semibold text-lg">
                          Similar companies found
                        </p>
                        <p className="text-sm text-gray-600">
                          The following companies have similar names:
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {searchResults.slice(0, 5).map((company) => (
                        <div
                          key={company.company_number}
                          className="border-l-4 border-gray-300 pl-4 py-2"
                        >
                          <p className="font-semibold text-gray-900">
                            {company.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            Company #{company.company_number}
                          </p>
                          <p className="text-xs text-gray-500">
                            {company.company_status} • {company.address_snippet}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Note: Similar names exist. Consider choosing a more unique
                      name.
                    </p>
                  </div>
                )}
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
            className="relative hidden lg:block"
          >
            {/* Building Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/Building.png"
                alt="UK Business Building"
                className="w-full h-[600px] object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Today's Stats Badge */}
              {/* ...removed Today's Stats Badge... */}
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            {
              title: "Authorised Agent",
              subtitle: "5 Star Rated Companies House",
              description: "Authorised Formation Agent",
              icon: Award,
            },
            {
              title: "Award Winning Team",
              subtitle: "With over 90 years of combined",
              description: "company formation experience",
              icon: Star,
            },
            {
              title: "Most-reviewed & Best Rated",
              subtitle: "UK's #1 company formation service on",
              description: "Google",
              icon: TrendingUp,
            },
            {
              title: "Fast Company Formation",
              subtitle: "Over 1.5M+ orders processed for clients",
              description: "globally",
              icon: Clock,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#D30B8D]/10 rounded-xl p-3">
                  <feature.icon className="w-6 h-6 text-[#D30B8D]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#003366] text-base mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feature.subtitle}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

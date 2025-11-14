import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to results page on search
  const handleCompanySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    setSearchLoading(true);
    navigate(`/company-results?query=${encodeURIComponent(searchTerm)}`);
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
              <form
                onSubmit={handleCompanySearch}
                className="flex items-center gap-2 w-full"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search a Company"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm sm:text-base text-gray-700 placeholder-gray-400 min-w-0"
                  disabled={searchLoading}
                />
                <Button
                  type="submit"
                  className="rounded-full bg-[#D40E60] hover:bg-[#B00D50] text-white w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
                  disabled={searchLoading}
                >
                  {searchLoading ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </motion.div>

            {/* Search Results moved to CompanyResultsPage */}

            {/* Error display removed: searchError is no longer used */}

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

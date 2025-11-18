import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import mainPageImage from "@/src/images/main-page.jpeg";

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
      {/* Full-width background image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${mainPageImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      >
        {/* Overlay: soft, semi-transparent dark blue/gray */}
        <div className="absolute inset-0 bg-[#1a2236]/40" />
      </div>
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                Register Your
                <br />
                Limited Company with Ease
                <br />
                <span className="text-[#FF7900]">From £2.48</span>
              </h1>

              <p className="text-base sm:text-lg text-white leading-relaxed max-w-xl">
                Set up a Limited Company with the UK's company registration
                expert. It's quick and easy. Our team does it all.
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
                  placeholder="Search Company Name"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent rounded-l-md focus:outline-none focus:ring-0 text-sm sm:text-base text-gray-700 placeholder-gray-400 min-w-0 border-none shadow-none"
                  style={{ border: "none", boxShadow: "none" }}
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
              <p className="text-sm text-white leading-relaxed">
                Companies open a bank account faster or equal chance of knowing
                partners. Choose a product banking partner during the process.
                Get up to £75K Cash Back.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Empty for now, background is now global for this section */}
          <div className="hidden lg:block" />
        </div>

        {/* Bottom Feature Cards removed as requested */}
      </div>
    </section>
  );
}

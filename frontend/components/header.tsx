import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
// Trustpilot badge styles
const trustpilotStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    padding: "0.75rem 1.5rem",
    margin: "1.5rem 0",
    maxWidth: "fit-content",
  },
  stars: {
    color: "#00B67A",
    fontSize: "1.5rem",
    marginRight: "0.5rem",
    letterSpacing: "0.1em",
  },
  score: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "#222",
    marginRight: "0.5rem",
  },
  reviews: {
    color: "#666",
    fontSize: "1rem",
    marginRight: "0.5rem",
  },
  trustpilot: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontWeight: 500,
    color: "#00B67A",
    fontSize: "1rem",
  },
  tick: {
    color: "#00B67A",
    fontSize: "1.1rem",
  },
};

export default function Header({
  showFlashSale = true,
}: {
  showFlashSale?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);

    // Handle page load and navigation
    if (location.pathname === "/") {
      if (location.hash) {
        // If there's a hash, scroll to that section only on navigation, not on reload
        setActiveSection(location.hash);
      } else {
        // No hash - we're at the home page root
        setActiveSection("/");
      }
    } else {
      // On other pages (blog, about, etc.)
      setActiveSection(location.pathname);
      {
        /* Trustpilot Review Badge */
      }
      <div style={trustpilotStyles.container}>
        <span style={trustpilotStyles.stars}>{"★★★★★"}</span>
        <span style={trustpilotStyles.score}>Excellent</span>
        <span style={trustpilotStyles.reviews}>
          4.8 out of 5 based on 8,370 reviews
        </span>
        <span style={trustpilotStyles.trustpilot}>
          <span style={trustpilotStyles.tick}>✔</span>
          Verified by Trustpilot
        </span>
      </div>;
    }
  }, [location]);

  // Handle click on hash links for smooth scrolling
  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hash = href.split("#")[1];
    if (hash && location.pathname === "/") {
      e.preventDefault();

      // Special handling for home - scroll to top and clear hash
      if (hash === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        // Clear the hash from URL
        window.history.pushState(null, "", "/");
        setActiveSection("/");
      } else {
        const element = document.getElementById(hash);
        if (element) {
          // Calculate offset for fixed header (flash banner + main header + nav = ~180px)
          const headerOffset = 200;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          window.history.pushState(null, "", `#${hash}`);
          setActiveSection(`#${hash}`);
        }
      }
    }
  };

  const servicesMenu = {
    "Virtual Office": [
      { label: "Registered Office Address", href: "#" },
      { label: "Virtual Business Address", href: "#" },
      { label: "Directors Privacy Address", href: "#" },
      { label: "Complete Virtual Office", href: "#" },
    ],
    "Call Answering": [
      { label: "Voicemail Only Service", href: "#" },
      { label: "Call Answering Service", href: "#" },
      { label: "Complete Virtual Office", href: "#" },
    ],
    "Company Formation": [
      { label: "Limited Company Formation", href: "#" },
      { label: "LLP Company Formation", href: "#" },
      { label: "Ltd By Guarantee Company Formation", href: "#" },
      { label: "Non Resident & International Company Formation", href: "#" },
    ],
    "Other Services": [
      { label: "Meeting Room Hire London", href: "#" },
      { label: "Business Accounting", href: "#" },
      { label: "Free Business Banking", href: "#" },
      { label: "UK Business Webdesign", href: "#" },
    ],
  };

  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services", hasDropdown: true },
    { label: "Pricing", href: "/#pricing" },
    { label: "Info", href: "/#info" },
    { label: "Blog", to: "/blog" },
    { label: "About", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Login", to: "/login" },
  ];

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.to) {
      return location.pathname === link.to;
    }
    if (link.href) {
      const hash = link.href.split("#")[1];

      // Check if we're on the home page
      if (location.pathname === "/") {
        // If there's a hash in URL, match it exactly
        if (location.hash) {
          return location.hash === `#${hash}`;
        }
        // If no hash in URL, only Home should be active
        return hash === "home";
      }
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[100] bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Flash Sale Banner */}
      {showFlashSale && (
        <div className="bg-gradient-to-r from-[#D30B5F] to-[#D40C60] text-white py-2.5 px-4 text-center text-base font-bold">
          ⚡ Special Offer: Enjoy exclusive discounts on our services for a
          limited time! ⚡
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/company-logo.png"
                alt="Company Logo"
                className="h-12 w-auto object-contain drop-shadow-sm"
                style={{ maxWidth: 60 }}
              />
              <div className="hidden sm:block">
                <div
                  className="font-bold text-xl text-[#262626]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  DARTS SECURITY
                </div>
                <div className="text-xs text-[#A3A8B0] uppercase tracking-wide">
                  A TEAM WITH OVER 100 YEARS EXPERIENCE
                </div>
              </div>
            </Link>

            {/* Right Side - Contact & Buttons */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D30B5F]" />
                <div className="text-left">
                  <div className="text-xs text-[#A3A8B0]">Call our team</div>
                  <a
                    href="tel:+442080389961"
                    className="text-[#262626] font-bold text-base hover:text-[#D30B5F] transition-colors"
                  >
                    +020 8038 9961
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <Button variant="outline" size="sm" asChild>
                <Link to="/contact">
                  <Mail className="w-4 h-4" />
                  Email Us
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/#pricing">View Packages</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#262626]" />
              ) : (
                <Menu className="w-6 h-6 text-[#262626]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Centered in Middle of Page */}
      <div className="hidden lg:block w-full border-b border-[#E0E0E0] bg-white">
        <div className="flex justify-center items-center w-full py-4">
          <nav className="flex items-center justify-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                // Services Dropdown
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button
                    className={`text-sm font-semibold transition-colors whitespace-nowrap hover:text-[#D30B5F] flex items-center gap-1 ${
                      isActive(link) ? "text-[#D30B5F]" : "text-black"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-0 right-0 top-[180px] bg-white shadow-2xl border-t border-b border-[#E0E0E0] z-50"
                      >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                          <div className="grid grid-cols-4 gap-8">
                            {Object.entries(servicesMenu).map(
                              ([category, items]) => (
                                <div key={category}>
                                  <h3 className="text-sm font-bold text-[#D30B5F] mb-3 border-b border-[#D30B5F] pb-2">
                                    {category}
                                  </h3>
                                  <ul className="space-y-2">
                                    {items.map((item) => (
                                      <li key={item.label}>
                                        <a
                                          href={item.href}
                                          className="text-xs text-[#262626] hover:text-[#D30B5F] transition-colors flex items-center gap-1"
                                        >
                                          <span className="text-[#D30B5F]">
                                            ›
                                          </span>
                                          {item.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setActiveSection(link.to)}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap hover:text-[#D30B5F] ${
                    isActive(link) ? "text-[#D30B5F]" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href) {
                      handleHashClick(e, link.href);
                    }
                  }}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap hover:text-[#D30B5F] ${
                    isActive(link) ? "text-[#D30B5F]" : "text-black"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-[#E0E0E0] bg-white"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => {
                      setActiveSection(link.to);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-base font-semibold py-2 transition-colors hover:text-[#D30B5F] ${
                      isActive(link) ? "text-[#D30B5F]" : "text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href) {
                        handleHashClick(e, link.href);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`text-base font-semibold py-2 transition-colors hover:text-[#D30B5F] ${
                      isActive(link) ? "text-[#D30B5F]" : "text-black"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#E0E0E0]">
                <Button variant="outline" asChild>
                  <Link to="/contact">Email Us</Link>
                </Button>
                <Button asChild>
                  <Link to="/#pricing">View Packages</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

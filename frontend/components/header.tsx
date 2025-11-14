import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import companyLogo from "@/src/images/company-logo.png";

export default function Header({
  showFlashSale = true,
}: {
  showFlashSale?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  // ...existing code...
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
      } else {
        // No hash - we're at the home page root
      }
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
    // { label: "Companies House Search", to: "/companies-search" },
    { label: "Blog", to: "/blog" },
    { label: "About", to: "/about" },
    { label: "Contact Us", to: "/contact" },
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
        <div className="bg-gradient-to-r from-[#D30B5F] to-[#D40C60] text-white py-2.5 px-4 text-center text-sm sm:text-base font-bold overflow-hidden">
          <span className="inline-block">
            Special Offer: Enjoy exclusive discounts on our services for a
            limited time!
          </span>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            >
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm bg-white rounded border border-gray-200"
                style={{ maxWidth: "50px" }}
              />
              <div className="hidden sm:block">
                <div
                  className="font-bold text-base sm:text-xl text-[#262626]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  DARTS SECURITY
                </div>
                <div className="text-[10px] sm:text-xs text-[#A3A8B0] uppercase tracking-wide">
                  A TEAM WITH OVER 100 YEARS EXPERIENCE
                </div>
              </div>
            </Link>

            {/* Right Side - Contact & Buttons */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D30B5F] flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-[#A3A8B0]">Call our team</div>
                  <a
                    href="tel:+442080389961"
                    className="text-[#262626] font-bold text-sm xl:text-base hover:text-[#D30B5F] transition-colors whitespace-nowrap"
                  >
                    +020 8038 9961
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-shrink-0"
              >
                <Link to="/contact">
                  <Mail className="w-4 h-4" />
                  Email Us
                </Link>
              </Button>
              <Button size="sm" asChild className="flex-shrink-0">
                <Link to="/#pricing">View Packages</Link>
              </Button>
              <Button size="sm" asChild className="flex-shrink-0">
                <Link to="/login">Login</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#262626]" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#262626]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Centered in Middle of Page */}
      <div className="hidden lg:block w-full border-b border-[#E0E0E0] bg-white overflow-x-hidden">
        <div className="flex justify-center items-center w-full py-4 px-4">
          <nav className="flex items-center justify-center gap-6 xl:gap-10 flex-wrap">
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
                  onClick={() => {}}
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
            className="lg:hidden border-b border-[#E0E0E0] bg-white overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className={`text-sm sm:text-base font-semibold py-2 transition-colors hover:text-[#D30B5F] ${
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
                    className={`text-sm sm:text-base font-semibold py-2 transition-colors hover:text-[#D30B5F] ${
                      isActive(link) ? "text-[#D30B5F]" : "text-black"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#E0E0E0]">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/contact">Email Us</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/#pricing">View Packages</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

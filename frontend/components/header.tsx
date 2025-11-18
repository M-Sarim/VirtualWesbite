import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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

    // Auto-scroll to top and clean URL on reload at "/"
    if (location.pathname === "/") {
      if (!location.hash) {
        // No hash - scroll to top and clean URL
        window.scrollTo({ top: 0, behavior: "auto" });
        if (window.location.hash) {
          window.history.replaceState(null, "", "/");
        }
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
    // Home is active if on root ("/") and either no hash or hash is #home
    if (link.label === "Home") {
      return (
        location.pathname === "/" &&
        (!location.hash || location.hash === "#home")
      );
    }
    // Other links: only active if not Home and hash matches
    if (link.to) {
      return location.pathname === link.to;
    }
    if (link.href) {
      const hash = link.href.split("#")[1];
      if (location.pathname === "/" && location.hash) {
        return hash && location.hash === `#${hash}` && hash !== "home";
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
      {/* Flash Sale Banner - only on Home page */}
      {showFlashSale && location.pathname === "/" && (
        <div
          className="bg-gradient-to-r from-[#D30B5F] to-[#D40C60] text-white py-2.5 px-4 text-center overflow-hidden"
          style={{
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "22px",
            lineHeight: "31px",
          }}
        >
          <span className="inline-block">
            ⚡️ "Special Offer" Enjoy exclusive discounts on our services for a
            limited time! ⚡️
          </span>
        </div>
      )}

      {/* Main Header */}
      <div className="relative">
        {/* Diagonal gray background using clip-path */}
        <div
          className="hidden lg:block absolute top-0 right-0 z-0 "
          style={{
            width: "calc(100% - 660px)", // Adjust 340px to match the left edge of the call section
            height: "60px",
            background: "#F6F8FA",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 58px 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            >
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-8 sm:h-10 w-auto object-contain drop-shadow-sm bg-white rounded border border-gray-200"
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

            {/* Removed old vertical separator, replaced by diagonal SVG above */}

            {/* Right Side - Contact & Buttons (More Right Aligned) */}
            <div
              className="hidden lg:flex items-center gap-4 xl:gap-6 ml-auto justify-end"
              style={{ flex: 1 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex-shrink-0"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#D30B5F"
                  >
                    <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                  </svg>
                </span>
                <span className="text-[#262626] font-bold text-sm xl:text-base whitespace-nowrap">
                  Call our team +44 (0) 7XXX XXXXXX
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-shrink-0"
              >
                <Link to="/contact">Email Us</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="flex-shrink-0 border-2 border-[#02C9AA] hover:bg-[#404040] hover:text-white hover:border-transparent focus:ring-2 focus:ring-[#02C9AA]"
              >
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
      <div className="hidden lg:block w-full bg-white overflow-x-hidden">
        <div className="flex justify-center items-center w-full py-3 px-4">
          <nav className="flex items-center justify-center gap-7 xl:gap-10 flex-wrap">
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
                    style={{
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "25px",
                    }}
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
                        className="fixed left-0 right-0 top-[160px] bg-white shadow-2xl border-t border-b border-[#E0E0E0] z-50"
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
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "25px",
                  }}
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
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "25px",
                  }}
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
                <Button
                  asChild
                  className="w-full border-2 border-[#02C9AA] hover:bg-[#404040] hover:text-white hover:border-transparent focus:ring-2 focus:ring-[#02C9AA]"
                >
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

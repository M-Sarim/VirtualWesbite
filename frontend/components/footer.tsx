import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 w-full">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D30B5F] to-[#FF1F7A] rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <span className="font-bold text-sm sm:text-base text-white">
                  UK
                </span>
              </div>
              <span className="font-bold text-lg sm:text-xl break-words">
                UK Business Pro
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-words">
              Launch your UK business with ease and professional support.
            </p>
          </div>

          {/* Services Links */}
          <div className="space-y-2 sm:space-y-3 w-full">
            <h4 className="font-bold text-sm sm:text-base text-white mb-3 sm:mb-4">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <a
                  href="/#services"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Virtual Address
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Company Formation
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Premium Pack
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Add-ons
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-2 sm:space-y-3 w-full">
            <h4 className="font-bold text-sm sm:text-base text-white mb-3 sm:mb-4">
              Connect With Us
            </h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2 hover:text-[#D30B5F] transition-colors break-all">
                <Mail size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="break-all">info@ukbuspro.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#D30B5F] transition-colors">
                <Phone size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                <span>+44 20 XXXX XXXX</span>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4 flex-wrap">
              <a
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
                aria-label="Twitter"
              >
                <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
                aria-label="Facebook"
              >
                <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0"
                aria-label="Instagram"
              >
                <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <p className="text-center sm:text-left">
              &copy; 2025 UK Business Pro. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center">
              <Link
                to="/privacy-policy"
                className="hover:text-[#D30B5F] transition-colors whitespace-nowrap"
              >
                Privacy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="hover:text-[#D30B5F] transition-colors whitespace-nowrap"
              >
                Terms
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#D30B5F] transition-colors whitespace-nowrap"
              >
                Support
              </Link>
              <button
                onClick={() =>
                  window.dispatchEvent(new Event("openCookieSettings"))
                }
                className="text-xs sm:text-sm text-gray-300 hover:text-[#D30B5F] transition-colors whitespace-nowrap"
              >
                Manage Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

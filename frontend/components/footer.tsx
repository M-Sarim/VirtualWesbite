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
    <footer className="bg-[#2D2D2D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D30B5F] to-[#FF1F7A] rounded-lg flex items-center justify-center shadow-md">
                <span className="font-bold text-base text-white">UK</span>
              </div>
              <span className="font-bold text-xl">UK Business Pro</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Launch your UK business with ease and professional support.
            </p>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-white mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
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
                  to="/"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-[#D30B5F] transition-colors inline-block"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-white mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 hover:text-[#D30B5F] transition-colors">
                <Mail size={16} />
                <span>info@ukbuspro.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#D30B5F] transition-colors">
                <Phone size={16} />
                <span>+44 20 XXXX XXXX</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-[#D30B5F] rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 UK Business Pro. All rights reserved.</p>
            <div className="flex gap-6 items-center">
              <Link to="/" className="hover:text-[#D30B5F] transition-colors">
                Privacy
              </Link>
              <Link to="/" className="hover:text-[#D30B5F] transition-colors">
                Terms
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#D30B5F] transition-colors"
              >
                Support
              </Link>
              <button
                onClick={() =>
                  window.dispatchEvent(new Event("openCookieSettings"))
                }
                className="text-sm text-gray-300 hover:text-[#D30B5F] transition-colors"
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

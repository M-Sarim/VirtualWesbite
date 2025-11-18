import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Phone,
  MapPin,
  CreditCard,
  Settings,
  Users,
  BarChart3,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Identity Verification",
    href: "/dashboard/identity-verification",
    icon: Shield,
  },
  {
    title: "Virtual Address",
    href: "/dashboard/virtual-address",
    icon: MapPin,
  },
  {
    title: "Phone Service",
    href: "/dashboard/phone-service",
    icon: Phone,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
];

const bottomNavItems: NavItem[] = [
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    setIsAdmin(user?.role === "admin");
  }, [user]);

  const adminNavItem: NavItem = {
    title: "Admin Panel",
    href: "/admin",
    icon: Shield,
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link to="/" className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#2D2D2D" }}
          >
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-white font-semibold text-lg">VirtualUK</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto sidebar-scroll">
        <div className="space-y-1">
          {/* Admin Panel Link (only for admins) */}
          {isAdmin && (
            <>
              {(() => {
                const Icon = adminNavItem.icon;
                const isActive = location.pathname === adminNavItem.href;
                return (
                  <Link
                    key={adminNavItem.href}
                    to={adminNavItem.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "text-white shadow-lg"
                        : "text-purple-400 hover:bg-white/5 hover:text-white"
                    )}
                    style={
                      isActive ? { backgroundColor: "#2D2D2D" } : undefined
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{adminNavItem.title}</span>
                  </Link>
                );
              })()}
              <div className="my-3 border-t border-white/10" />
            </>
          )}

          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
                style={isActive ? { backgroundColor: "#2D2D2D" } : undefined}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/10" />

        {/* Bottom Navigation */}
        <div className="space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
                style={isActive ? { backgroundColor: "#2D2D2D" } : undefined}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: "#2D2D2D" }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {user?.name || "User"}
              {isAdmin && (
                <span className="ml-2 text-xs text-purple-400">(Admin)</span>
              )}
            </p>
            <p className="text-gray-400 text-xs truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
        <button
          className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          onClick={() => {
            logout();
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg text-white"
        style={{ backgroundColor: "#2D2D2D" }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col z-40"
        style={{ backgroundColor: "#2D2D2D" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <aside
            className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50 lg:hidden"
            style={{ backgroundColor: "#2D2D2D" }}
          >
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}

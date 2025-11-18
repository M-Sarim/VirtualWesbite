import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

const navItems = [
  { label: "Dashboard", path: "/admin-dashboard" },
  { label: "Companies & Orders", path: "/admin/companies-orders" },
  { label: "KYC & Document Review", path: "/admin/kyc" },
  { label: "Virtual Address Management", path: "/admin/virtual-addresses" },
  { label: "Billing & Payments", path: "/admin/billing" },
  { label: "Packages & Pricing", path: "/admin/packages" },
  { label: "Integrations & Settings", path: "/admin/integrations" },
  { label: "Users, Roles & Activity Log", path: "/admin/users" },
  { label: "Activity Log", path: "/admin/activity" },
  { label: "Accessibility & Mobile", path: "/admin/accessibility" },
  { label: "Notifications & Error States", path: "/admin/notifications" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <aside className="bg-[#23272F] text-white w-64 min-h-screen flex flex-col py-8 px-4">
      <div className="font-bold text-xl mb-8 tracking-wide">Admin Portal</div>
      <nav className="flex-1 flex flex-col">
        <ul className="space-y-2 flex-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                className={`w-full text-left px-3 py-2 rounded transition font-medium ${
                  window.location.pathname === item.path
                    ? "bg-[#D30B5F] text-white"
                    : "hover:bg-[#353945] text-gray-200"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../admin/AdminDashboard";
import { useAuth } from "../../lib/hooks/useAuth";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated and is an admin
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="pt-10">
      <AdminDashboard />
    </div>
  );
}

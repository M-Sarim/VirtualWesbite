import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AdminDashboard from "@/components/admin-dashboard";
import { useAuth } from "@/lib/hooks/useAuth";

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
    <>
      <Header showFlashSale={false} />
      <div className="pt-20">
        <AdminDashboard />
      </div>
      <Footer />
    </>
  );
}

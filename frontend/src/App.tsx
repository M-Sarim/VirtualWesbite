import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Loading } from "@/components/Loading";
import { usePageTracking, useScrollTracking } from "@/lib/hooks/useAnalytics";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CompaniesOrdersPage = lazy(() => import("./pages/CompaniesOrdersPage"));
const CustomerProfilePage = lazy(() => import("./pages/CustomerProfilePage"));
const VirtualAddressManagementPage = lazy(
  () => import("./pages/VirtualAddressManagementPage")
);
const KYCReviewQueuePage = lazy(() => import("./pages/KYCReviewQueuePage"));
const BillingPaymentsPage = lazy(() => import("./pages/BillingPaymentsPage"));
const PackagesPricingPage = lazy(() => import("./pages/PackagesPricingPage"));
const IntegrationsSettingsPage = lazy(
  () => import("./pages/IntegrationsSettingsPage")
);
const UsersRolesActivityLogPage = lazy(
  () => import("./pages/UsersRolesActivityLogPage")
);
const CompanyResultsPage = lazy(() => import("./pages/CompanyResultsPage"));
const PersonalDetailsPage = lazy(() => import("./pages/PersonalDetailsPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage")
);
const NotificationsErrorStatesPage = lazy(
  () => import("./pages/NotificationsErrorStatesPage")
);

function App() {
  // Track page views automatically on route changes
  usePageTracking();

  // Track scroll depth
  useScrollTracking();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading fullScreen text="Loading page..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/company-results" element={<CompanyResultsPage />} />
          <Route path="/personal-details" element={<PersonalDetailsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
          <Route
            path="/admin/companies-orders"
            element={<CompaniesOrdersPage />}
          />
          <Route path="/admin/customer/:id" element={<CustomerProfilePage />} />
          <Route
            path="/admin/virtual-addresses"
            element={<VirtualAddressManagementPage />}
          />
          <Route path="/admin/kyc" element={<KYCReviewQueuePage />} />
          <Route path="/admin/billing" element={<BillingPaymentsPage />} />
          <Route path="/admin/packages" element={<PackagesPricingPage />} />
          <Route
            path="/admin/integrations"
            element={<IntegrationsSettingsPage />}
          />
          <Route path="/admin/users" element={<UsersRolesActivityLogPage />} />
          <Route
            path="/admin/accessibility"
            element={<AccessibilityMobilePage />}
          />
          <Route
            path="/admin/notifications"
            element={<NotificationsErrorStatesPage />}
          />
          {/* <Route path="/admin-dashboard" element={<AdminDashboardPage />} /> */}
          {/* Use <Route path="/admin" element={<AdminPage />} /> for admin dashboard */}
        </Routes>
      </Suspense>
      <Toaster position="top-right" richColors />
    </ErrorBoundary>
  );
}

const AccessibilityMobilePage = lazy(
  () => import("./pages/AccessibilityMobilePage")
);
export default App;

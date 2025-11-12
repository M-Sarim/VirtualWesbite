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
const PersonalizationPage = lazy(() => import("./pages/PersonalizationPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

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
          <Route path="/personalize" element={<PersonalizationPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" richColors />
    </ErrorBoundary>
  );
}

export default App;

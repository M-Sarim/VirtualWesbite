import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Loading } from "@/components/Loading";
import { CookieConsent } from "@/components/cookie-consent";
import { usePageTracking, useScrollTracking } from "@/lib/hooks/useAnalytics";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

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
        </Routes>
      </Suspense>
      <Toaster position="top-right" richColors />
      <CookieConsent />
    </ErrorBoundary>
  );
}

export default App;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview, fbPageView } from "../analytics";

/**
 * Custom hook to track page views in React Router
 * Add this to your main App component
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Track page view with Google Analytics
    pageview(location.pathname + location.search);

    // Track page view with Facebook Pixel
    fbPageView();
  }, [location]);
}

/**
 * Custom hook to track scroll depth
 */
export function useScrollTracking() {
  useEffect(() => {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        thresholds.forEach((threshold) => {
          if (scrollPercent >= threshold && !tracked.has(threshold)) {
            tracked.add(threshold);
            // Import and use trackScrollDepth from analytics
            import("../analytics").then(({ trackScrollDepth }) => {
              trackScrollDepth(threshold);
            });
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

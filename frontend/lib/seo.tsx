import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * SEO Component for managing page meta tags
 * Use this component in each page to set page-specific SEO
 */
export function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const location = useLocation();
  const siteUrl = window.location.origin;

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (
      selector: string,
      content: string | undefined,
      attribute: string = "content"
    ) => {
      if (!content) return;

      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const selectorParts = selector.match(/\[(.+?)=["'](.+?)["']\]/);
        if (selectorParts) {
          element.setAttribute(selectorParts[1], selectorParts[2]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Update basic meta tags
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', ogTitle || title);
    updateMetaTag(
      'meta[property="og:description"]',
      ogDescription || description
    );
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag(
      'meta[property="og:url"]',
      ogUrl || `${siteUrl}${location.pathname}`
    );
    updateMetaTag('meta[property="og:type"]', ogType);

    // Update Twitter Card tags
    updateMetaTag('meta[property="twitter:card"]', twitterCard);
    updateMetaTag(
      'meta[property="twitter:title"]',
      twitterTitle || ogTitle || title
    );
    updateMetaTag(
      'meta[property="twitter:description"]',
      twitterDescription || ogDescription || description
    );
    updateMetaTag('meta[property="twitter:image"]', twitterImage || ogImage);

    // Update canonical link
    const canonicalUrl = canonical || `${siteUrl}${location.pathname}`;
    let linkElement = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.rel = "canonical";
      document.head.appendChild(linkElement);
    }
    linkElement.href = canonicalUrl;

    // Update robots meta tag
    const robotsContent = `${noindex ? "noindex" : "index"},${
      nofollow ? "nofollow" : "follow"
    }`;
    updateMetaTag('meta[name="robots"]', robotsContent);
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical,
    noindex,
    nofollow,
    location,
    siteUrl,
  ]);

  return null; // This component doesn't render anything
}

/**
 * Default SEO configuration
 */
export const defaultSEO = {
  title: "UK Business Pro - Virtual Address & Company Formation",
  description:
    "Launch your UK business with ease. Virtual office address, company formation, and business support services for entrepreneurs worldwide.",
  keywords:
    "UK business, virtual office, company formation, virtual address, business services, UK company registration",
  ogImage: `${window.location.origin}/og-image.jpg`,
  twitterCard: "summary_large_image" as const,
};

/**
 * Helper function to generate page-specific SEO title
 */
export const generatePageTitle = (pageTitle: string, includeCompany = true) => {
  if (includeCompany) {
    return `${pageTitle} | UK Business Pro`;
  }
  return pageTitle;
};

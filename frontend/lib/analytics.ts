// Analytics and Tracking Utilities

// Extend Window interface for tracking scripts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// Google Analytics Events
export const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Replace with your actual ID

export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Facebook Pixel Events
export const FB_PIXEL_ID = "YOUR_PIXEL_ID"; // Replace with your actual ID

export const fbPageView = () => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "PageView");
  }
};

export const fbEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", eventName, data);
  }
};

// Common Facebook Pixel events
export const fbEvents = {
  viewContent: (data?: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
  }) => {
    fbEvent("ViewContent", data);
  },

  addToCart: (data?: {
    content_name?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
  }) => {
    fbEvent("AddToCart", data);
  },

  initiateCheckout: (data?: {
    value?: number;
    currency?: string;
    num_items?: number;
  }) => {
    fbEvent("InitiateCheckout", data);
  },

  purchase: (data: {
    value: number;
    currency: string;
    content_ids?: string[];
    content_type?: string;
  }) => {
    fbEvent("Purchase", data);
  },

  lead: (data?: {
    content_name?: string;
    value?: number;
    currency?: string;
  }) => {
    fbEvent("Lead", data);
  },

  completeRegistration: (data?: {
    content_name?: string;
    value?: number;
    currency?: string;
  }) => {
    fbEvent("CompleteRegistration", data);
  },

  contact: (data?: { content_name?: string }) => {
    fbEvent("Contact", data);
  },
};

// Google Conversion Tracking
export const trackConversion = (
  conversionId: string,
  conversionLabel: string,
  value?: number,
  currency: string = "GBP"
) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "conversion", {
      send_to: `${conversionId}/${conversionLabel}`,
      value: value,
      currency: currency,
    });
  }
};

// Phone Call Tracking
export const trackPhoneCall = (phoneNumber: string) => {
  event({
    action: "phone_call",
    category: "engagement",
    label: phoneNumber,
  });

  fbEvent("Contact", { content_name: "phone_call" });

  // Google Ads Call Conversion
  trackConversion("AW-XXXXXXXXX", "CALL_CONVERSION_LABEL");
};

// Form Submission Tracking
export const trackFormSubmission = (
  formName: string,
  _data?: Record<string, any>
) => {
  event({
    action: "form_submit",
    category: "engagement",
    label: formName,
  });

  fbEvents.lead({ content_name: formName });

  // Google Ads Conversion
  trackConversion("AW-XXXXXXXXX", "FORM_CONVERSION_LABEL");
};

// Button Click Tracking
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: "button_click",
    category: "engagement",
    label: `${buttonName} - ${location}`,
  });
};

// Link Click Tracking
export const trackLinkClick = (linkUrl: string, linkText: string) => {
  event({
    action: "link_click",
    category: "navigation",
    label: `${linkText} - ${linkUrl}`,
  });
};

// Video Play Tracking
export const trackVideoPlay = (videoTitle: string, _videoUrl: string) => {
  event({
    action: "video_play",
    category: "engagement",
    label: videoTitle,
  });
};

// Scroll Depth Tracking
export const trackScrollDepth = (depth: number) => {
  event({
    action: "scroll_depth",
    category: "engagement",
    label: `${depth}%`,
    value: depth,
  });
};

// E-commerce Tracking
export const ecommerce = {
  viewItem: (item: {
    id: string;
    name: string;
    price: number;
    category?: string;
  }) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "view_item", {
        items: [item],
      });
    }
    fbEvents.viewContent({
      content_name: item.name,
      content_category: item.category,
      value: item.price,
      currency: "GBP",
    });
  },

  addToCart: (item: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
  }) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "add_to_cart", {
        items: [item],
        value: item.price * (item.quantity || 1),
        currency: "GBP",
      });
    }
    fbEvents.addToCart({
      content_name: item.name,
      content_ids: [item.id],
      value: item.price * (item.quantity || 1),
      currency: "GBP",
    });
  },

  beginCheckout: (items: any[], value: number) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "begin_checkout", {
        items: items,
        value: value,
        currency: "GBP",
      });
    }
    fbEvents.initiateCheckout({
      value: value,
      currency: "GBP",
      num_items: items.length,
    });
  },

  purchase: (transactionId: string, items: any[], value: number) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "purchase", {
        transaction_id: transactionId,
        items: items,
        value: value,
        currency: "GBP",
      });
    }
    fbEvents.purchase({
      value: value,
      currency: "GBP",
      content_ids: items.map((i) => i.id),
    });

    // Google Ads Purchase Conversion
    trackConversion("AW-XXXXXXXXX", "PURCHASE_CONVERSION_LABEL", value);
  },
};

// User Timing Tracking
export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "timing_complete", {
      name: variable,
      value: value,
      event_category: category,
      event_label: label,
    });
  }
};

// Exception Tracking
export const trackException = (description: string, fatal: boolean = false) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "exception", {
      description: description,
      fatal: fatal,
    });
  }
};

// Custom Dimension Tracking
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("set", "user_properties", properties);
  }
};

// Session Control
export const startSession = () => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", "session_start");
  }
};

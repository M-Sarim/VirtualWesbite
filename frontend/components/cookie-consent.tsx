import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, Cookie } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    performance: false,
    advertisement: false,
    uncategorized: false,
  });

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      performance: true,
      advertisement: true,
      uncategorized: true,
    };
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-preferences", JSON.stringify(allPreferences));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
    setShowModal(false);
    // Show header when modal closes
    document.body.style.overflow = "";
    const header = document.querySelector("header");
    if (header) {
      (header as HTMLElement).style.display = "";
    }
    enableTracking();
  };

  const rejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      performance: false,
      advertisement: false,
      uncategorized: false,
    };
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem(
      "cookie-preferences",
      JSON.stringify(minimalPreferences)
    );
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
    setShowModal(false);
    // Show header when modal closes
    document.body.style.overflow = "";
    const header = document.querySelector("header");
    if (header) {
      (header as HTMLElement).style.display = "";
    }
    disableTracking();
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", "custom");
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
    setShowModal(false);
    // Show header when modal closes
    document.body.style.overflow = "";
    const header = document.querySelector("header");
    if (header) {
      (header as HTMLElement).style.display = "";
    }
    if (
      preferences.analytics ||
      preferences.performance ||
      preferences.advertisement
    ) {
      enableTracking();
    } else {
      disableTracking();
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === "necessary") return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const openCustomize = () => {
    setShowModal(true);
    // Hide header when modal opens
    document.body.style.overflow = "hidden";
    const header = document.querySelector("header");
    if (header) {
      (header as HTMLElement).style.display = "none";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Show header when modal closes
    document.body.style.overflow = "";
    const header = document.querySelector("header");
    if (header) {
      (header as HTMLElement).style.display = "";
    }
  };

  const enableTracking = () => {
    // Re-initialize tracking scripts if they were disabled
    // This is handled by the scripts in index.html
    console.log("Tracking enabled");
  };

  const disableTracking = () => {
    // Disable Google Analytics
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    // Disable Facebook Pixel
    if (window.fbq) {
      window.fbq("consent", "revoke");
    }

    console.log("Tracking disabled");
  };

  return (
    <>
      {/* Initial Banner (only on first visit) */}
      {showBanner && !showModal && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 relative">
            <button
              onClick={rejectAll}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all"
              aria-label="Close"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-sm text-gray-700 mb-3 pr-4">
              <p>
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below.
              </p>
            </div>

            <button
              onClick={openCustomize}
              className="text-sm text-blue-600 hover:underline mb-3 block"
            >
              Customize Consent Preferences
            </button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAll}
                className="flex-1 text-xs border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Reject All
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                Accept All
              </Button>
            </div>

            {/* Powered by CookieYes */}
            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-end gap-1 text-[10px] text-gray-500">
              <span>Powered by</span>
              <a
                href="https://www.cookieyes.com/product/cookie-consent/?ref=cypbcyb&utm_source=cookie-banner&utm_medium=powered-by-cookieyes#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-700 hover:text-[#D30B5F] transition-colors"
              >
                CookieYes
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Revisit Consent Button (always visible on all pages) */}
      {!showModal && (
        <button
          onClick={openCustomize}
          className="fixed bottom-4 left-4 z-50 w-14 h-14 bg-gradient-to-br from-[#D30B5F] to-[#FF1F7A] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Revisit cookie consent"
        >
          <Cookie className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Customization Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Customize Consent Preferences
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition-all"
                aria-label="Close"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[calc(90vh-180px)]">
              <p className="text-sm text-gray-700 mb-2">
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below.
              </p>

              <p className="text-sm text-gray-700 mb-5">
                The cookies that are categorized as "Necessary" are stored on
                your browser as they are essential for enabling the basic
                functionalities of the site.
                {showMoreInfo && (
                  <>
                    {" "}
                    We also use third-party cookies that help us analyze how you
                    use this website, store your preferences, and provide the
                    content and advertisements that are relevant to you. These
                    cookies will only be stored in your browser with your prior
                    consent.
                    <br />
                    <br />
                    You can choose to enable or disable some or all of these
                    cookies but disabling some of them may affect your browsing
                    experience.
                  </>
                )}{" "}
                <button
                  onClick={() => setShowMoreInfo(!showMoreInfo)}
                  className="text-blue-600 hover:underline"
                >
                  {showMoreInfo ? "Show less" : "Show more"}
                </button>
              </p>

              {/* Necessary Cookies */}
              <div className="mb-1">
                <button
                  onClick={() => toggleCategory("necessary")}
                  className="w-full flex items-center gap-2 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedCategories.includes("necessary")
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                  <span className="font-semibold text-gray-900 flex-1">
                    Necessary
                  </span>
                  <span className="text-green-600 text-sm font-semibold">
                    Always Active
                  </span>
                </button>
                {expandedCategories.includes("necessary") && (
                  <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200">
                    <p className="mb-3">
                      Necessary cookies are required to enable the basic
                      features of this site, such as providing secure log-in or
                      adjusting your consent preferences. These cookies do not
                      store any personally identifiable data.
                    </p>
                    <div className="bg-gray-50 p-3 text-center text-gray-500">
                      No cookies to display.
                    </div>
                  </div>
                )}
              </div>

              {/* Functional Cookies */}
              <div className="mb-1 border-t border-gray-200">
                <button
                  onClick={() => toggleCategory("functional")}
                  className="w-full flex items-center gap-2 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedCategories.includes("functional")
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                  <span className="font-semibold text-gray-900 flex-1">
                    Functional
                  </span>
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => togglePreference("functional")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                  </label>
                </button>
                {expandedCategories.includes("functional") && (
                  <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200">
                    <p className="mb-3">
                      Functional cookies help perform certain functionalities
                      like sharing the content of the website on social media
                      platforms, collecting feedback, and other third-party
                      features.
                    </p>
                    <div className="bg-gray-50 p-4">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-semibold">Cookie</td>
                            <td className="py-2">__lc_cid</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-semibold">Duration</td>
                            <td className="py-2">1 year 1 month 4 days</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold align-top">
                              Description
                            </td>
                            <td className="py-2">
                              This is an essential cookie for the website live
                              chat box to function properly.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Analytics Cookies */}
              <div className="mb-1 border-t border-gray-200">
                <button
                  onClick={() => toggleCategory("analytics")}
                  className="w-full flex items-center gap-2 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedCategories.includes("analytics")
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                  <span className="font-semibold text-gray-900 flex-1">
                    Analytics
                  </span>
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference("analytics")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                  </label>
                </button>
                {expandedCategories.includes("analytics") && (
                  <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200">
                    <p className="mb-3">
                      Analytical cookies are used to understand how visitors
                      interact with the website. These cookies help provide
                      information on metrics such as the number of visitors,
                      bounce rate, traffic source, etc.
                    </p>
                    <div className="bg-gray-50 p-4">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-semibold">Cookie</td>
                            <td className="py-2">_ga</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-semibold">Duration</td>
                            <td className="py-2">1 year 1 month 4 days</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold align-top">
                              Description
                            </td>
                            <td className="py-2">
                              Google Analytics sets this cookie to calculate
                              visitor, session and campaign data and track site
                              usage for the site's analytics report. The cookie
                              stores information anonymously and assigns a
                              randomly generated number to recognise unique
                              visitors.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Performance Cookies */}
              <div className="mb-1 border-t border-gray-200">
                <button
                  onClick={() => toggleCategory("performance")}
                  className="w-full flex items-center gap-2 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedCategories.includes("performance")
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                  <span className="font-semibold text-gray-900 flex-1">
                    Performance
                  </span>
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.performance}
                      onChange={() => togglePreference("performance")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                  </label>
                </button>
                {expandedCategories.includes("performance") && (
                  <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200">
                    <p className="mb-3">
                      Performance cookies are used to understand and analyze the
                      key performance indexes of the website which helps in
                      delivering a better user experience for the visitors.
                    </p>
                    <div className="bg-gray-50 p-3 text-center text-gray-500">
                      No cookies to display.
                    </div>
                  </div>
                )}
              </div>

              {/* Advertisement Cookies */}
              <div className="mb-1 border-t border-gray-200">
                <button
                  onClick={() => toggleCategory("advertisement")}
                  className="w-full flex items-center gap-2 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedCategories.includes("advertisement")
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                  <span className="font-semibold text-gray-900 flex-1">
                    Advertisement
                  </span>
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.advertisement}
                      onChange={() => togglePreference("advertisement")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                  </label>
                </button>
                {expandedCategories.includes("advertisement") && (
                  <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200">
                    <p className="mb-3">
                      Advertisement cookies are used to provide visitors with
                      customized advertisements based on the pages you visited
                      previously and to analyze the effectiveness of the ad
                      campaigns.
                    </p>
                    <div className="bg-gray-50 p-4">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-semibold">Cookie</td>
                            <td className="py-2">_fbp</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 font-semibold">Duration</td>
                            <td className="py-2">3 months</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold align-top">
                              Description
                            </td>
                            <td className="py-2">
                              Facebook sets this cookie to display
                              advertisements when either on Facebook or on a
                              digital platform powered by Facebook advertising
                              after visiting the website.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Uncategorized Cookies */}
              <div className="mb-1 border-t border-gray-200">
                <button
                  onClick={() => toggleCategory("uncategorized")}
                  className="w-full flex items-center gap-2 p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                      expandedCategories.includes("uncategorized")
                        ? "rotate-90"
                        : ""
                    }`}
                  />
                  <span className="font-semibold text-gray-900 flex-1">
                    Uncategorized
                  </span>
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.uncategorized}
                      onChange={() => togglePreference("uncategorized")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                  </label>
                </button>
                {expandedCategories.includes("uncategorized") && (
                  <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200">
                    <p className="mb-3">
                      Other uncategorized cookies are those that are being
                      analyzed and have not been classified into a category as
                      yet.
                    </p>
                    <div className="bg-gray-50 p-3 text-center text-gray-500">
                      No cookies to display.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-200 bg-gray-100 p-5">
              <div className="flex flex-col gap-4">
                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    variant="outline"
                    onClick={rejectAll}
                    className="flex-1 rounded-none border-2 border-[#4C82E4] text-[#4C82E4] hover:bg-[#4C82E4] hover:text-white hover:border-[#4C82E4] text-base font-medium transition-all duration-200 py-6"
                  >
                    Reject All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={savePreferences}
                    className="flex-1 rounded-none border-2 border-[#4C82E4] text-[#4C82E4] hover:bg-[#4C82E4] hover:text-white hover:border-[#4C82E4] text-base font-medium transition-all duration-200 py-6"
                  >
                    Save My Preferences
                  </Button>
                  <Button
                    onClick={acceptAll}
                    className="flex-1 rounded-none bg-[#4C82E4] hover:bg-[#3D6BBE] text-white text-base font-medium transition-all duration-200 py-6"
                  >
                    Accept All
                  </Button>
                </div>

                {/* Powered by CookieYes - Right aligned */}
                <div className="flex justify-end">
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <span>Powered by</span>
                    <a
                      href="https://www.cookieyes.com/product/cookie-consent/?ref=cypbcyb&utm_source=cookie-banner&utm_medium=powered-by-cookieyes#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-900 hover:text-[#D30B5F] transition-colors"
                    >
                      CookieYes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

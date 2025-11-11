import { useState, useEffect, useRef } from "react";
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

  const [language, setLanguage] = useState("en");
  const [cookieToggles, setCookieToggles] = useState<Record<string, boolean>>({
    __lc_cid: false,
    _ga: false,
    _fbp: false,
  });
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalTop, setModalTop] = useState<number>(0);

  const translations: Record<string, Record<string, string>> = {
    en: {
      banner_message: "We use cookies to improve your experience.",
      customize: "Customize Preferences",
      accept_all: "Accept All",
      reject_all: "Reject All",
      save_preferences: "Save My Preferences",
      manage_settings: "Manage Cookie Settings",
      modal_title: "Customize Consent Preferences",
      delete_data: "Delete My Data",
    },
    es: {
      banner_message: "Usamos cookies para mejorar su experiencia.",
      customize: "Personalizar preferencias",
      accept_all: "Aceptar todo",
      reject_all: "Rechazar todo",
      save_preferences: "Guardar mis preferencias",
      manage_settings: "Gestionar cookies",
      modal_title: "Personalizar preferencias de consentimiento",
      delete_data: "Eliminar mis datos",
    },
    fr: {
      banner_message:
        "Nous utilisons des cookies pour améliorer votre expérience.",
      customize: "Personnaliser les préférences",
      accept_all: "Tout accepter",
      reject_all: "Tout refuser",
      save_preferences: "Enregistrer mes préférences",
      manage_settings: "Gérer les cookies",
      modal_title: "Personnaliser les préférences de consentement",
      delete_data: "Supprimer mes données",
    },
  };

  const t = (key: string) =>
    translations[language]?.[key] || translations.en[key] || key;

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    // detect language
    try {
      const lang = navigator.language?.split("-")[0];
      if (lang && translations[lang]) setLanguage(lang);
    } catch {}

    // Respect Do Not Track preference
    try {
      const dnt =
        // @ts-ignore
        navigator.doNotTrack ||
        (window as any).doNotTrack ||
        (navigator as any).msDoNotTrack;
      if (dnt === "1" || dnt === "yes") {
        // If DNT is enabled, automatically decline tracking cookies
        const minimalPreferences = {
          necessary: true,
          functional: false,
          analytics: false,
          performance: false,
          advertisement: false,
          uncategorized: false,
        };
        localStorage.setItem("cookie-consent", "declined-dnt");
        localStorage.setItem(
          "cookie-preferences",
          JSON.stringify(minimalPreferences)
        );
        localStorage.setItem("cookie-consent-date", new Date().toISOString());
        setPreferences(minimalPreferences);
        setShowBanner(false);
        logConsent("declined-dnt", minimalPreferences);
        return;
      }
    } catch (e) {
      // ignore
    }

    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // If there are stored preferences, load them
      const stored = localStorage.getItem("cookie-preferences");
      if (stored) {
        try {
          setPreferences(JSON.parse(stored));
        } catch {}
      }
      const details = localStorage.getItem("cookie-details");
      if (details) {
        try {
          setCookieToggles(JSON.parse(details));
        } catch {}
      }
    }

    // Listen for external requests to open cookie settings (e.g., from footer)
    const openHandler = () => {
      openCustomize();
    };
    window.addEventListener("openCookieSettings", openHandler as EventListener);
    return () => {
      window.removeEventListener(
        "openCookieSettings",
        openHandler as EventListener
      );
    };
  }, []);

  // Consent logging for audit/compliance
  const logConsent = (action: string, prefs: any = preferences) => {
    try {
      const key = "cookie-consent-log";
      const raw = localStorage.getItem(key);
      const log = raw ? JSON.parse(raw) : [];
      log.push({ action, preferences: prefs, date: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(log));
    } catch (e) {
      // ignore
    }
  };

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
    logConsent("accepted", allPreferences);
    setCookieToggles({ __lc_cid: true, _ga: true, _fbp: true });
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
    logConsent("declined", minimalPreferences);
    setCookieToggles({ __lc_cid: false, _ga: false, _fbp: false });
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
    // Persist detailed per-cookie settings as well
    try {
      localStorage.setItem("cookie-details", JSON.stringify(cookieToggles));
    } catch {}
    logConsent("custom", { preferences, details: cookieToggles });
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
      // keep header visible — header is fixed with a higher z-index
      // compute header height so modal can be positioned below it
      try {
        const rect = (header as HTMLElement).getBoundingClientRect();
        setModalTop(rect.height + 12); // 12px gap below header
      } catch (e) {}
    }
    // set initial focus to modal for accessibility
    setTimeout(() => {
      modalRef.current?.focus();
    }, 50);
  };

  const closeModal = () => {
    setShowModal(false);
    // Show header when modal closes
    document.body.style.overflow = "";
    const header = document.querySelector("header");
    if (header) {
      // header stays visible; no display toggling needed
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

  // Keyboard accessibility: close on Escape and trap focus when modal open
  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
      if (e.key === "Tab") {
        // basic focus trap
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  const deleteData = () => {
    localStorage.removeItem("cookie-consent");
    localStorage.removeItem("cookie-preferences");
    localStorage.removeItem("cookie-consent-date");
    localStorage.removeItem("cookie-consent-log");
    setPreferences({
      necessary: true,
      functional: false,
      analytics: false,
      performance: false,
      advertisement: false,
      uncategorized: false,
    });
    disableTracking();
    alert("Your cookie preferences and logs have been removed.");
  };

  const toggleCookieToggle = (name: string) => {
    setCookieToggles((prev) => ({ ...prev, [name]: !prev[name] }));
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

            <div className="flex items-start gap-3 mb-3 pr-4">
              <div className="flex-shrink-0 mt-0.5">
                <Cookie className="w-6 h-6 text-[#D40E60]" />
              </div>
              <div className="text-sm text-gray-700 flex-1">
                <p className="font-medium">{t("banner_message")}</p>
              </div>
            </div>

            <button
              onClick={openCustomize}
              className="text-sm text-blue-600 hover:underline mb-3 block"
            >
              {t("customize")}
            </button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={rejectAll}
                className="flex-1 text-xs border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                {t("reject_all")}
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t("accept_all")}
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
      <div className="fixed bottom-4 left-4 z-[110] group flex items-center">
        <button
          onClick={() => {
            if (showModal) {
              closeModal();
            } else {
              openCustomize();
            }
          }}
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center ${
            showModal
              ? "bg-[#D30B5F]"
              : "bg-gradient-to-br from-[#D30B5F] to-[#FF1F7A]"
          }`}
          aria-label={
            showModal ? "Close cookie preferences" : "Manage cookie settings"
          }
        >
          {showModal ? (
            <X className="w-7 h-7 text-white transition-transform" />
          ) : (
            <Cookie className="w-7 h-7 text-white transition-transform" />
          )}
        </button>
        <span
          className="absolute left-full ml-3 px-4 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap select-none opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          Manage Cookie Settings
        </span>
      </div>

      {/* Customization Modal */}
      {showModal && (
        <div
          onMouseDown={(e) => {
            // Close when clicking outside the modal (overlay)
            if (e.target === e.currentTarget) closeModal();
          }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-6 animate-in fade-in duration-300"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            ref={modalRef}
            tabIndex={-1}
            style={{ marginTop: Math.max(0, modalTop - 40) }}
            className="bg-white shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-500 border border-gray-200 rounded-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2
                id="cookie-modal-title"
                className="text-lg sm:text-xl font-semibold text-gray-900"
              >
                {t("modal_title")}
              </h2>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
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
                    {/* Per-cookie controls (granular) */}
                    <div className="mt-3 bg-white p-3 border border-gray-100 rounded">
                      <div className="flex items-center justify-between text-sm text-gray-700 py-2">
                        <div>
                          <div className="font-semibold">__lc_cid</div>
                          <div className="text-xs text-gray-500">
                            Essential for live chat — expires in 1 year
                          </div>
                        </div>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cookieToggles.__lc_cid}
                              onChange={() => toggleCookieToggle("__lc_cid")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                          </label>
                        </div>
                      </div>
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
                    <div className="mt-3 bg-white p-3 border border-gray-100 rounded">
                      <div className="flex items-center justify-between text-sm text-gray-700 py-2">
                        <div>
                          <div className="font-semibold">_ga</div>
                          <div className="text-xs text-gray-500">
                            Analytics cookie — expires after 30 days
                          </div>
                        </div>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cookieToggles._ga}
                              onChange={() => toggleCookieToggle("_ga")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                          </label>
                        </div>
                      </div>
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
                  <>
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
                    <div className="mt-3 bg-white p-3 border border-gray-100 rounded">
                      <div className="flex items-center justify-between text-sm text-gray-700 py-2">
                        <div>
                          <div className="font-semibold">_fbp</div>
                          <div className="text-xs text-gray-500">
                            Ad cookie — expires after 90 days
                          </div>
                        </div>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cookieToggles._fbp}
                              onChange={() => toggleCookieToggle("_fbp")}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C82E4]"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
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
                    {t("reject_all")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={savePreferences}
                    className="flex-1 rounded-none border-2 border-[#4C82E4] text-[#4C82E4] hover:bg-[#4C82E4] hover:text-white hover:border-[#4C82E4] text-base font-medium transition-all duration-200 py-6"
                  >
                    {t("save_preferences")}
                  </Button>
                  <Button
                    onClick={acceptAll}
                    className="flex-1 rounded-none bg-[#4C82E4] hover:bg-[#3D6BBE] text-white text-base font-medium transition-all duration-200 py-6"
                  >
                    {t("accept_all")}
                  </Button>
                </div>
                {/* Footer row: delete data (left) + Powered by (right) */}
                <div className="flex justify-between items-center">
                  <div>
                    <Button
                      variant="ghost"
                      onClick={deleteData}
                      className="text-xs text-gray-600 hover:text-red-600"
                    >
                      {t("delete_data")}
                    </Button>
                  </div>
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

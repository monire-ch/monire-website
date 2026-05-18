import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  captureAttributionFromLanding,
  initAnalyticsFromConsent,
  onConsentEvent,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";

const AnalyticsManager = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalyticsFromConsent();
    onConsentEvent();

    const onDocumentClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const inFaqSection = Boolean(anchor.closest("#faq"));
      const isClientBriefDownload =
        anchor.hasAttribute("download") && href.includes("/documents/client-brief.docx");
      if (inFaqSection && isClientBriefDownload) {
        // Configure this as a conversion event in the GA4 property UI.
        trackEvent("client_brief_download", {
          location: "faq",
          destination: href,
          page_path: window.location.pathname,
        });
      }

      if (inFaqSection && href.startsWith("/insights")) {
        trackEvent("blog_cta_click", {
          location: "faq",
          destination: href,
          page_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  useEffect(() => {
    const pathWithSearch = `${location.pathname}${location.search}`;
    captureAttributionFromLanding(pathWithSearch);
    trackPageView(`${location.pathname}${location.hash}`);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default AnalyticsManager;

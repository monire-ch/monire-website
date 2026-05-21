import { ANALYTICS_CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type AttributionPayload = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  initial_landing_page?: string;
  initial_referrer?: string;
  first_touch_timestamp?: string;
};

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const FIRST_TOUCH_KEY = "monire:first_touch:v1";
const LAST_TOUCH_KEY = "monire:last_touch:v1";
const FIRST_TOUCH_TTL_MS = 90 * 24 * 60 * 60 * 1000;
let consentDefaultsSet = false;
let gtagScriptRequested = false;
let gtagConfigured = false;

const safeStorageGet = (storage: Storage, key: string): string | null => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (storage: Storage, key: string, value: string): void => {
  try {
    storage.setItem(key, value);
  } catch {
    // Ignore storage errors (private mode, blocked storage).
  }
};

const ensureDataLayerAndGtag = () => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtagProxy() {
      window.dataLayer?.push(arguments as unknown as object);
    };
  }
};

const configureGoogleTag = () => {
  if (!GA_MEASUREMENT_ID || gtagConfigured) return;
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  gtagConfigured = true;
};

export const bootstrapConsentMode = () => {
  if (typeof window === "undefined" || consentDefaultsSet) return;
  ensureDataLayerAndGtag();
  window.gtag?.("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  consentDefaultsSet = true;
};

const loadGtagScript = () => {
  if (typeof document === "undefined" || !GA_MEASUREMENT_ID || gtagScriptRequested) return;
  ensureDataLayerAndGtag();

  // Queue init/config immediately so early events after consent are not lost.
  configureGoogleTag();

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = () => {
    // Safe no-op if already configured.
    configureGoogleTag();
  };
  script.onerror = () => {};
  document.head.appendChild(script);
  gtagScriptRequested = true;
};

export const updateAnalyticsConsent = (granted: boolean) => {
  bootstrapConsentMode();
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
  if (granted) loadGtagScript();
};

export const initAnalyticsFromConsent = () => {
  bootstrapConsentMode();
  updateAnalyticsConsent(hasAnalyticsConsent());
};

const canTrack = () => Boolean(hasAnalyticsConsent() && GA_MEASUREMENT_ID && window.gtag);

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  // Add future GA4 events through this helper to keep naming/params consistent and consent-safe.
  const debugEnabled =
    typeof window !== "undefined" &&
    (import.meta.env.DEV || new URLSearchParams(window.location.search).get("debug_mode") === "true");
  const consentGranted = hasAnalyticsConsent();
  const hasMeasurementId = Boolean(GA_MEASUREMENT_ID);
  const hasGtag = typeof window !== "undefined" && typeof window.gtag === "function";

  if (debugEnabled) {
    // eslint-disable-next-line no-console
    console.debug("[analytics] trackEvent attempt", eventName, {
      ...params,
      __debug: {
        consentGranted,
        hasMeasurementId,
        hasGtag,
      },
    });
  }

  if (!canTrack()) {
    if (debugEnabled) {
      // eslint-disable-next-line no-console
      console.debug("[analytics] trackEvent skipped", eventName);
    }
    return;
  }
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // Never break UX when analytics is blocked/unavailable.
  }
};

export const trackPageView = (pagePath: string) => {
  if (!canTrack()) return;
  trackEvent("page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
};

const getUtmParamsFromUrl = (search: string) => {
  const params = new URLSearchParams(search);
  const utm_source = params.get("utm_source") ?? undefined;
  const utm_medium = params.get("utm_medium") ?? undefined;
  const utm_campaign = params.get("utm_campaign") ?? undefined;
  const utm_content = params.get("utm_content") ?? undefined;
  const utm_term = params.get("utm_term") ?? undefined;
  const hasUtm = Boolean(utm_source || utm_medium || utm_campaign || utm_content || utm_term);
  return { hasUtm, utm_source, utm_medium, utm_campaign, utm_content, utm_term };
};

const readAttribution = (key: string): AttributionPayload | null => {
  if (typeof window === "undefined") return null;
  const raw = safeStorageGet(window.localStorage, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AttributionPayload;
  } catch {
    return null;
  }
};

const writeAttribution = (key: string, payload: AttributionPayload) => {
  if (typeof window === "undefined") return;
  safeStorageSet(window.localStorage, key, JSON.stringify(payload));
};

const hasSessionFlag = (key: string): boolean => {
  if (typeof window === "undefined") return false;
  return safeStorageGet(window.sessionStorage, key) === "1";
};

const setSessionFlag = (key: string) => {
  if (typeof window === "undefined") return;
  safeStorageSet(window.sessionStorage, key, "1");
};

export const captureAttributionFromLanding = (pathWithSearch: string) => {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const [pathOnly, search = ""] = pathWithSearch.split("?");
  const utm = getUtmParamsFromUrl(search ? `?${search}` : "");
  const now = Date.now();
  const currentReferrer = document.referrer || "";
  const currentLandingPayload: AttributionPayload = {
    ...utm,
    initial_landing_page: pathOnly,
    initial_referrer: currentReferrer,
    first_touch_timestamp: new Date(now).toISOString(),
  };

  if (utm.hasUtm) {
    const existingFirstTouch = readAttribution(FIRST_TOUCH_KEY);
    const existingTimestamp = existingFirstTouch?.first_touch_timestamp
      ? new Date(existingFirstTouch.first_touch_timestamp).getTime()
      : 0;
    const isExpired = !existingTimestamp || Number.isNaN(existingTimestamp) || now - existingTimestamp > FIRST_TOUCH_TTL_MS;

    if (!existingFirstTouch || isExpired) {
      writeAttribution(FIRST_TOUCH_KEY, currentLandingPayload);
    }
    writeAttribution(LAST_TOUCH_KEY, currentLandingPayload);
  } else if (!readAttribution(FIRST_TOUCH_KEY)) {
    writeAttribution(FIRST_TOUCH_KEY, {
      initial_landing_page: pathOnly,
      initial_referrer: currentReferrer,
      first_touch_timestamp: new Date(now).toISOString(),
    });
  }

  if (utm.hasUtm) {
    const utmEventKey = `monire:utm_landing:${pathWithSearch}`;
    if (!hasSessionFlag(utmEventKey)) {
      trackEvent("utm_landing", {
        source: utm.utm_source,
        medium: utm.utm_medium,
        campaign: utm.utm_campaign,
        content: utm.utm_content,
        landing_page: pathOnly,
        page_path: pathOnly,
      });
      setSessionFlag(utmEventKey);
    }
  }

};

export const getFormAttributionFields = (): Record<string, string> => {
  const firstTouch = readAttribution(FIRST_TOUCH_KEY) ?? {};
  const lastTouch = readAttribution(LAST_TOUCH_KEY) ?? {};
  return {
    first_touch_timestamp: firstTouch.first_touch_timestamp ?? "",
    initial_landing_page: firstTouch.initial_landing_page ?? "",
    initial_referrer: firstTouch.initial_referrer ?? "",
    utm_source: firstTouch.utm_source ?? "",
    utm_medium: firstTouch.utm_medium ?? "",
    utm_campaign: firstTouch.utm_campaign ?? "",
    utm_content: firstTouch.utm_content ?? "",
    utm_term: firstTouch.utm_term ?? "",
    last_touch_utm_source: lastTouch.utm_source ?? "",
    last_touch_utm_medium: lastTouch.utm_medium ?? "",
    last_touch_utm_campaign: lastTouch.utm_campaign ?? "",
    last_touch_utm_content: lastTouch.utm_content ?? "",
    last_touch_utm_term: lastTouch.utm_term ?? "",
  };
};

export const onConsentEvent = (): (() => void) | undefined => {
  if (typeof window === "undefined") return undefined;
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{ choice?: "accepted" | "rejected" }>;
    const granted = customEvent.detail?.choice === "accepted";
    updateAnalyticsConsent(granted);
    if (granted) {
      // Send first page_view immediately after consent is accepted.
      trackPageView(`${window.location.pathname}${window.location.hash}`);
    }
  };
  window.addEventListener(ANALYTICS_CONSENT_EVENT, handler);
  return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, handler);
};

export const COOKIE_CONSENT_KEY = "cookie-consent-v1";
export const ANALYTICS_CONSENT_EVENT = "monire:analytics-consent";

export type ConsentChoice = "accepted" | "rejected";

export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
};

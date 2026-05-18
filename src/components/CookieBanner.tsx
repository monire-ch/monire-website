import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const COOKIE_CONSENT_KEY = "cookie-consent-v1";

type ConsentChoice = "accepted" | "rejected";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existingChoice = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    setVisible(!existingChoice);
  }, []);

  const setConsent = (choice: ConsentChoice) => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[120] lg:left-3 lg:right-auto lg:w-full lg:max-w-md">
      <div
        className="mx-auto w-full max-w-3xl rounded-2xl border border-off-white/[0.12] px-5 py-4 text-off-white shadow-2xl lg:mx-0"
        style={{
          background: "linear-gradient(135deg, rgba(8,47,58,0.96) 0%, rgba(5,34,44,0.98) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <p className="text-sm leading-relaxed text-off-white/90">
          We use cookies to improve site performance and understand traffic. You can accept or reject non-essential cookies.
          See our{" "}
          <Link to="/privacy" className="text-gold-text underline underline-offset-2 hover:text-gold-hover">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="rounded-full border border-off-white/20 px-4 py-2 text-sm font-medium text-off-white/90 transition-colors hover:text-off-white"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-full px-4 py-2 text-sm font-semibold text-off-white transition-all"
            style={{
              background: "linear-gradient(135deg, #0F4B5A 0%, #136175 100%)",
              boxShadow: "inset 0 0 0 1px rgba(207,169,71,0.3)",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

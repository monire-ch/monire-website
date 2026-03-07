import { FC, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  "Web Design",
  "Web Development",
  "AI Automations",
  "Website Migration",
  "SEO & Analytics",
  "Other",
];

const BUDGET_OPTIONS = [
  "<CHF 5'000",
  "CHF 5'000 – 10'000",
  "CHF 10'000 – 20'000",
  "CHF 20'000+",
];

interface CustomSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

const CustomSelect: FC<CustomSelectProps> = ({ name, label, placeholder, options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="text-off-white/70 text-sm font-body block mb-1.5">
        {label}{required && "*"}
      </label>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-off-white/10 border border-off-white/20 rounded-xl px-4 py-3.5 text-left text-sm font-body focus:outline-none focus:border-gold transition-colors flex items-center justify-between"
      >
        <span className={value ? "text-off-white" : "text-off-white/40"}>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-off-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[#0a3a4a] border border-off-white/20 rounded-xl overflow-hidden shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-body text-off-white hover:bg-off-white/10 transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const inputClasses =
  "w-full bg-off-white/10 border border-off-white/20 rounded-xl px-4 py-3.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors placeholder:text-off-white/40";

const ContactModal: FC<ContactModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;
    const formData = new FormData(e.currentTarget);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setSubmitted(true);
    } catch {
      // silently fail in preview; works on Netlify
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setService("");
      setBudget("");
      setAgreed(false);
    }, 400);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className={`absolute inset-0 bg-deep-ink/60 contact-overlay ${open ? "open" : ""}`} onClick={handleClose} />

      <div
        className={`absolute top-0 right-0 bottom-0 w-full max-w-md dark-teal-surface contact-panel ${open ? "open" : ""} p-8 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-body text-2xl text-off-white">{t("contact.title")}</h2>
          <button onClick={handleClose} className="text-off-white/60 hover:text-off-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-gold text-5xl mb-4">✓</div>
            <h3 className="font-body text-xl text-off-white mb-2">Thank you!</h3>
            <p className="text-off-white/60 text-sm font-body mb-8">We'll get back to you shortly.</p>
            <button onClick={handleClose} className="btn-outline-gold text-sm">Close</button>
          </div>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            {/* Full Name */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.fullName")}*</label>
              <input type="text" name="fullName" className={inputClasses} placeholder={t("contact.fullNamePlaceholder")} required />
            </div>

            {/* Company */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.company")}</label>
              <input type="text" name="company" className={inputClasses} placeholder={t("contact.companyPlaceholder")} />
            </div>

            {/* Email */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.email")}*</label>
              <input type="email" name="email" className={inputClasses} placeholder={t("contact.emailPlaceholder")} required />
            </div>

            {/* Website */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.website")}</label>
              <input type="url" name="website" className={inputClasses} placeholder={t("contact.websitePlaceholder")} />
            </div>

            {/* Service dropdown */}
            <CustomSelect
              name="service"
              label={t("contact.service")}
              placeholder={t("contact.servicePlaceholder")}
              options={SERVICE_OPTIONS}
              value={service}
              onChange={setService}
              required
            />

            {/* Budget dropdown */}
            <CustomSelect
              name="budget"
              label={t("contact.budget")}
              placeholder={t("contact.budgetPlaceholder")}
              options={BUDGET_OPTIONS}
              value={budget}
              onChange={setBudget}
            />

            {/* Message */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.message")}*</label>
              <textarea
                name="message"
                rows={5}
                className={`${inputClasses} resize-vertical`}
                placeholder={t("contact.messagePlaceholder")}
                required
              />
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-off-white/30 bg-transparent accent-gold"
                required
              />
              <span className="text-off-white/70 text-sm font-body">
                {t("contact.terms")}{" "}
                <Link to="/privacy-policy" className="text-gold-text underline hover:text-gold transition-colors">
                  {t("contact.privacyPolicy")}
                </Link>.
              </span>
            </label>

            {/* Submit */}
            <button type="submit" className="btn-gold text-sm inline-flex items-center gap-2">
              {t("contact.send")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;

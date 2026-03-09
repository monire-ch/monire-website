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
  "Non-profit project application",
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

interface CustomMultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  required?: boolean;
}

const CustomMultiSelect: FC<CustomMultiSelectProps> = ({ name, label, placeholder, options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]);
  };

  return (
    <div ref={ref} className="relative">
      <label className="text-off-white/70 text-sm font-body block mb-1.5">
        {label}{required && "*"}
      </label>
      <input type="hidden" name={name} value={value.join(", ")} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-off-white/10 border border-off-white/20 rounded-xl px-4 py-3.5 text-left text-sm font-body focus:outline-none focus:border-gold transition-colors flex items-center justify-between min-h-[3rem]"
      >
        <span className={value.length ? "text-off-white" : "text-off-white/40"}>
          {value.length ? value.join(", ") : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-off-white/50 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[#0a3a4a] border border-off-white/20 rounded-xl overflow-hidden shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className="w-full text-left px-4 py-3 text-sm font-body text-off-white hover:bg-off-white/10 transition-colors flex items-center gap-3"
            >
              <span className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${value.includes(opt) ? "bg-gold border-gold" : "border-off-white/30"}`}>
                {value.includes(opt) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 3L9 1" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </span>
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
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [fieldValues, setFieldValues] = useState({ fullName: "", email: "", message: "" });

  const errors = {
    fullName: attempted && !fieldValues.fullName.trim(),
    email: attempted && (!fieldValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(fieldValues.email.trim())),
    service: attempted && services.length === 0,
    message: attempted && !fieldValues.message.trim(),
    agreed: attempted && !agreed,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    if (!fieldValues.fullName.trim() || !fieldValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email.trim()) || services.length === 0 || !fieldValues.message.trim() || !agreed) return;
    const formData = new FormData(e.currentTarget);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setServices([]);
      setBudget("");
      setAgreed(false);
      setAttempted(false);
      setFieldValues({ fullName: "", email: "", message: "" });
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
              <input type="text" name="fullName" className={`${inputClasses} ${errors.fullName ? "!border-red-400" : ""}`} placeholder={t("contact.fullNamePlaceholder")} value={fieldValues.fullName} onChange={e => setFieldValues(v => ({ ...v, fullName: e.target.value }))} />
              {errors.fullName && <p className="text-red-400 text-xs font-body mt-1">Please enter your full name.</p>}
            </div>

            {/* Company */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.company")}</label>
              <input type="text" name="company" className={inputClasses} placeholder={t("contact.companyPlaceholder")} />
            </div>

            {/* Email */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.email")}*</label>
              <input type="email" name="email" className={`${inputClasses} ${errors.email ? "!border-red-400" : ""}`} placeholder={t("contact.emailPlaceholder")} value={fieldValues.email} onChange={e => setFieldValues(v => ({ ...v, email: e.target.value }))} />
              {errors.email && <p className="text-red-400 text-xs font-body mt-1">{!fieldValues.email.trim() ? "Please enter your email." : "Please enter a valid email address."}</p>}
            </div>

            {/* Website */}
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.website")}</label>
              <input type="url" name="website" className={inputClasses} placeholder={t("contact.websitePlaceholder")} />
            </div>

            {/* Service multiselect */}
            <div>
              <CustomMultiSelect
                name="service"
                label={t("contact.service")}
                placeholder={t("contact.servicePlaceholder")}
                options={SERVICE_OPTIONS}
                value={services}
                onChange={setServices}
                required
              />
              {errors.service && <p className="text-red-400 text-xs font-body mt-1">Please select at least one service.</p>}
            </div>

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
                className={`${inputClasses} resize-vertical ${errors.message ? "!border-red-400" : ""}`}
                placeholder={t("contact.messagePlaceholder")}
                value={fieldValues.message}
                onChange={e => setFieldValues(v => ({ ...v, message: e.target.value }))}
              />
              {errors.message && <p className="text-red-400 text-xs font-body mt-1">Please enter a message.</p>}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-off-white/30 bg-transparent accent-gold"
              />
              <span className={`text-sm font-body ${errors.agreed ? "text-red-400" : "text-off-white/70"}`}>
                {t("contact.terms")}{" "}
                <Link to="/privacy" className="text-gold-text underline hover:text-gold transition-colors" onClick={handleClose}>
                  {t("contact.privacyPolicy")}
                </Link>.
              </span>
            </label>

            {/* Submit */}
            <button type="submit" className="btn-gold text-sm">
              {t("contact.send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;

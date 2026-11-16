import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import BrandButton from "./BrandButton";
import { getFormAttributionFields, trackEvent } from "@/lib/analytics";
import { useLocalePath } from "@/hooks/useLocalePath";

interface ContactFormProps {
  variant: "modal" | "page";
  formName: string;
  onClose?: () => void;
  formLocation?: string;
  mode?: "default" | "vet";
}

const VET_AUDIENCE_LABELS: Record<string, string> = {
  practices: "Veterinary practice",
  "animal-health": "Animal health company",
  "software-teams": "Vet software or startup",
};

const VET_AUDIENCE_LABELS_DE: Record<string, string> = {
  practices: "Eine Tierarztpraxis",
  "animal-health": "Ein Tiergesundheitsunternehmen",
  "software-teams": "Veterinärsoftware",
};

interface SelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

interface MultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  required?: boolean;
  className?: string;
}

const inputClasses =
  "w-full bg-off-white/10 border border-off-white/30 rounded-xl px-4 py-3.5 text-off-white text-sm font-body focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/70 transition-colors placeholder:text-off-white/65";

const SelectField: FC<SelectProps> = ({ name, label, placeholder, options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerId = `${name}-trigger`;
  const listboxId = `${name}-listbox`;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label htmlFor={triggerId} className="text-off-white/80 text-sm font-body block mb-1.5">
        {label}
        {required && "*"}
      </label>
      <input type="hidden" name={name} value={value} />
      <button
        id={triggerId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-required={required}
        className="w-full bg-off-white/10 border border-off-white/30 rounded-xl px-4 py-3.5 text-left text-sm font-body focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/70 transition-colors flex items-center justify-between"
      >
        <span className={value ? "text-off-white" : "text-off-white/65"}>{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-off-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div id={listboxId} role="listbox" className="absolute z-10 mt-1 w-full bg-[#0a3a4a] border border-off-white/30 rounded-xl overflow-hidden shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={value === opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm font-body text-off-white hover:bg-off-white/10 focus-visible:bg-off-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MultiSelectField: FC<MultiSelectProps> = ({
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  required,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerId = `${name}-trigger`;
  const listboxId = `${name}-listbox`;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };

  return (
    <div className="relative">
      <label htmlFor={triggerId} className="text-off-white/80 text-sm font-body block mb-1.5">
        {label}
        {required && "*"}
      </label>
      <input type="hidden" name={name} value={value.join(", ")} />
      <button
        id={triggerId}
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-required={required}
        className={`${inputClasses} text-left flex items-center justify-between min-h-[3rem] ${className ?? ""}`}
      >
        <span className={value.length ? "text-off-white" : "text-off-white/65"}>
          {value.length ? value.join(", ") : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-off-white/50 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div
          id={listboxId}
          ref={menuRef}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-10 mt-1 w-full bg-[#0a3a4a] border border-off-white/30 rounded-xl overflow-hidden shadow-lg [&::-webkit-scrollbar]:hidden"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={value.includes(opt)}
              onClick={() => toggle(opt)}
              className="w-full text-left px-4 py-3 text-sm font-body text-off-white hover:bg-off-white/10 focus-visible:bg-off-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold transition-colors flex items-center gap-3"
            >
              <span
                className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${value.includes(opt) ? "bg-gold border-gold" : "border-off-white/30"}`}
              >
                {value.includes(opt) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l2.5 3L9 1"
                      stroke="#1a1a1a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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

const ContactForm: FC<ContactFormProps> = ({ variant, formName, onClose, formLocation, mode = "default" }) => {
  const { t, i18n } = useTranslation();
  const isGerman = i18n.language.startsWith("de");
  const localePath = useLocalePath();
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [vetAudience, setVetAudience] = useState(() => {
    if (typeof window === "undefined") return "";
    return VET_AUDIENCE_LABELS[new URLSearchParams(window.location.search).get("for") ?? ""] ?? "";
  });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [fieldValues, setFieldValues] = useState({ fullName: "", email: "", message: "" });
  const attributionFields = getFormAttributionFields();

  const isModal = variant === "modal";
  const isVet = mode === "vet";
  const vetAudienceLabels = isGerman ? VET_AUDIENCE_LABELS_DE : VET_AUDIENCE_LABELS;
  const vetAudienceOptions = [...Object.values(vetAudienceLabels), isGerman ? "Etwas anderes" : "Something else"];
  const locationLabel = formLocation ?? (isModal ? "modal" : "contact_page");
  const emailValid = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(fieldValues.email.trim());
  const serviceOptions = t('contact.serviceOptions', { returnObjects: true }) as string[];
  const budgetOptions = t('contact.budgetOptions', { returnObjects: true }) as string[];

  const errors = {
    fullName: attempted && !fieldValues.fullName.trim(),
    email: attempted && (!fieldValues.email.trim() || !emailValid),
    service: attempted && (isVet ? !vetAudience : services.length === 0),
    message: attempted && !fieldValues.message.trim(),
    agreed: attempted && !agreed,
  };

  useEffect(() => {
    if (!isVet) return;
    const handleAudience = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      setVetAudience(vetAudienceLabels[value as keyof typeof vetAudienceLabels] ?? value);
    };
    window.addEventListener("vet-audience", handleAudience);
    return () => window.removeEventListener("vet-audience", handleAudience);
  }, [isVet, vetAudienceLabels]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    setSubmitError(false);
    trackEvent("form_submit_attempt", {
      form_location: locationLabel,
      service: isVet ? vetAudience : services.join(","),
      page_path: window.location.pathname,
    });

    if (
      !fieldValues.fullName.trim() ||
      !fieldValues.email.trim() ||
      !emailValid ||
      (isVet ? !vetAudience : services.length === 0) ||
      !fieldValues.message.trim() ||
      !agreed
    ) {
      trackEvent("form_submit_error", {
        form_location: locationLabel,
        error_type: "validation",
        page_path: window.location.pathname,
      });
      return;
    }

    const formData = new FormData(e.currentTarget);

    let serverError = false;
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
        ).toString(),
      });
      if (!response.ok) {
        serverError = true;
        trackEvent("form_submit_error", {
          form_location: locationLabel,
          error_type: "server",
          page_path: window.location.pathname,
        });
        throw new Error("Form submission failed");
      }
      trackEvent("form_submit_success", {
        form_location: locationLabel,
        page_path: window.location.pathname,
      });
      setSubmitted(true);
    } catch {
      if (!serverError) {
        trackEvent("form_submit_error", {
          form_location: locationLabel,
          error_type: "network",
          page_path: window.location.pathname,
        });
      }
      setSubmitError(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-gold text-5xl mb-4">✓</div>
        <h3 className="font-body text-xl text-off-white mb-2">{t('contact.successTitle')}</h3>
        <p className="text-off-white/60 text-sm font-body mb-8">{t('contact.successMessage')}</p>
        {isModal ? (
          <BrandButton variant="secondary" showStar className="text-sm" onClick={onClose}>
            {t('contact.close')}
          </BrandButton>
        ) : (
          <BrandButton type="link" to={localePath(isVet ? "/vet" : "/")} variant="secondary" showStar className="text-sm">
            {t('common.backToHome')}
          </BrandButton>
        )}
      </div>
    );
  }

  return (
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={isVet ? "space-y-4" : "space-y-5"}
    >
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="bot-field" />
      {Object.entries(attributionFields).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}

      {isVet ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="vet-full-name" className="text-off-white/80 text-sm font-body block mb-1.5">Name*</label>
              <input
                id="vet-full-name"
                type="text"
                name="fullName"
                autoComplete="name"
                required
                aria-invalid={errors.fullName}
                aria-describedby={errors.fullName ? "vet-full-name-error" : undefined}
                className={`${inputClasses} ${errors.fullName ? "!border-red-400" : ""}`}
                value={fieldValues.fullName}
                onChange={(e) => setFieldValues((value) => ({ ...value, fullName: e.target.value }))}
              />
              {errors.fullName && <p id="vet-full-name-error" role="alert" className="text-red-300 text-xs font-body mt-1">{isGerman ? "Bitte geben Sie Ihren Namen ein." : "Please enter your name."}</p>}
            </div>
            <div>
              <label htmlFor="vet-email" className="text-off-white/80 text-sm font-body block mb-1.5">{isGerman ? "E-Mail" : "Email"}*</label>
              <input
                id="vet-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                aria-invalid={errors.email}
                aria-describedby={errors.email ? "vet-email-error" : undefined}
                className={`${inputClasses} ${errors.email ? "!border-red-400" : ""}`}
                value={fieldValues.email}
                onChange={(e) => setFieldValues((value) => ({ ...value, email: e.target.value }))}
              />
              {errors.email && <p id="vet-email-error" role="alert" className="text-red-300 text-xs font-body mt-1">{isGerman ? "Bitte geben Sie eine gültige E-Mail-Adresse ein." : "Please enter a valid email address."}</p>}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="vet-organisation" className="text-off-white/80 text-sm font-body block mb-1.5">Organisation</label>
              <input id="vet-organisation" type="text" name="organisation" autoComplete="organization" className={inputClasses} />
            </div>
            <div>
              <SelectField
                name="audience"
                label={isGerman ? "Ihr Anliegen" : "I’m contacting you about"}
                placeholder={isGerman ? "Bitte auswählen" : "Choose one"}
                options={vetAudienceOptions}
                value={vetAudience}
                onChange={setVetAudience}
                required
              />
              {errors.service && <p role="alert" className="text-red-300 text-xs font-body mt-1">{isGerman ? "Bitte wählen Sie eine Option." : "Please choose an option."}</p>}
            </div>
          </div>
        </>
      ) : isModal ? (
        <>
          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.fullName")}*</label>
            <input
              type="text"
              name="fullName"
              className={`${inputClasses} ${errors.fullName ? "!border-red-400" : ""}`}
              placeholder={t("contact.fullNamePlaceholder")}
              value={fieldValues.fullName}
              onChange={(e) => setFieldValues((v) => ({ ...v, fullName: e.target.value }))}
            />
            {errors.fullName && <p className="text-red-400 text-xs font-body mt-1">{t('contact.errors.fullName')}</p>}
          </div>

          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.company")}</label>
            <input type="text" name="company" className={inputClasses} placeholder={t("contact.companyPlaceholder")} />
          </div>

          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.email")}*</label>
            <input
              type="email"
              name="email"
              className={`${inputClasses} ${errors.email ? "!border-red-400" : ""}`}
              placeholder={t("contact.emailPlaceholder")}
              value={fieldValues.email}
              onChange={(e) => setFieldValues((v) => ({ ...v, email: e.target.value }))}
            />
            {errors.email && (
              <p className="text-red-400 text-xs font-body mt-1">
                {!fieldValues.email.trim() ? t('contact.errors.emailRequired') : t('contact.errors.emailInvalid')}
              </p>
            )}
          </div>

          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.website")}</label>
            <input type="url" name="website" className={inputClasses} placeholder={t("contact.websitePlaceholder")} />
          </div>

          <div>
            <MultiSelectField
              name="service"
              label={t("contact.service")}
              placeholder={t("contact.servicePlaceholder")}
              options={serviceOptions}
              value={services}
              onChange={setServices}
              required
              className={errors.service ? "!border-red-400" : ""}
            />
            {errors.service && <p className="text-red-400 text-xs font-body mt-1">{t('contact.errors.service')}</p>}
          </div>

          <SelectField
            name="budget"
            label={t("contact.budget")}
            placeholder={t("contact.budgetPlaceholder")}
            options={budgetOptions}
            value={budget}
            onChange={setBudget}
          />
        </>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.fullName")}*</label>
              <input
                type="text"
                name="fullName"
                className={`${inputClasses} ${errors.fullName ? "!border-red-400" : ""}`}
                placeholder={t("contact.fullNamePlaceholder")}
                value={fieldValues.fullName}
                onChange={(e) => setFieldValues((v) => ({ ...v, fullName: e.target.value }))}
              />
              {errors.fullName && <p className="text-red-400 text-xs font-body mt-1">{t('contact.errors.fullName')}</p>}
            </div>
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.company")}</label>
              <input type="text" name="company" className={inputClasses} placeholder={t("contact.companyPlaceholder")} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.email")}*</label>
              <input
                type="email"
                name="email"
                className={`${inputClasses} ${errors.email ? "!border-red-400" : ""}`}
                placeholder={t("contact.emailPlaceholder")}
                value={fieldValues.email}
                onChange={(e) => setFieldValues((v) => ({ ...v, email: e.target.value }))}
              />
              {errors.email && (
                <p className="text-red-400 text-xs font-body mt-1">
                  {!fieldValues.email.trim() ? t('contact.errors.emailRequired') : t('contact.errors.emailInvalid')}
                </p>
              )}
            </div>
            <div>
              <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.website")}</label>
              <input type="url" name="website" className={inputClasses} placeholder={t("contact.websitePlaceholder")} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <MultiSelectField
                name="service"
                label={t("contact.service")}
                placeholder={t("contact.servicePlaceholder")}
                options={serviceOptions}
                value={services}
                onChange={setServices}
                required
                className={errors.service ? "!border-red-400" : ""}
              />
              {errors.service && <p className="text-red-400 text-xs font-body mt-1">{t('contact.errors.service')}</p>}
            </div>
            <SelectField
              name="budget"
              label={t("contact.budget")}
              placeholder={t("contact.budgetPlaceholder")}
              options={budgetOptions}
              value={budget}
              onChange={setBudget}
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor={`${formName}-message`} className="text-off-white/80 text-sm font-body block mb-1.5">{t("contact.message")}*</label>
        <textarea
          id={`${formName}-message`}
          name="message"
          required
          aria-invalid={errors.message}
          aria-describedby={errors.message ? `${formName}-message-error` : undefined}
          rows={isVet ? 3 : 5}
          className={`${inputClasses} resize-vertical ${errors.message ? "!border-red-400" : ""}`}
          placeholder={t("contact.messagePlaceholder")}
          value={fieldValues.message}
          onChange={(e) => setFieldValues((v) => ({ ...v, message: e.target.value }))}
        />
        {errors.message && <p id={`${formName}-message-error`} role="alert" className="text-red-300 text-xs font-body mt-1">{t('contact.errors.message')}</p>}
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-off-white/30 bg-transparent accent-gold"
        />
        <span className={`text-sm font-body ${errors.agreed ? "text-red-400" : "text-off-white/70"}`}>
          {t("contact.terms")} {" "}
          <Link
            to={localePath('/privacy')}
            className="text-gold-text underline decoration-gold underline-offset-2 transition-colors hover:text-off-white hover:no-underline focus-visible:text-off-white focus-visible:no-underline focus-visible:outline-none"
            onClick={isModal ? onClose : undefined}
          >
            {t("contact.privacyPolicy")}
          </Link>
          {t("contact.termsSuffix")}
        </span>
      </label>

      {submitError && (
        <div
          aria-live="polite"
          className="rounded-xl border border-red-400/40 bg-red-950/30 p-4"
        >
          <p className="text-red-200 text-sm font-body">
            {t('contact.errors.submit')}{" "}
            <a
              href="mailto:hello@monire.ch"
              onClick={() => {
                trackEvent("email_click", {
                  location: `${locationLabel}_error_panel`,
                  destination: "mailto:hello@monire.ch",
                  page_path: window.location.pathname,
                });
              }}
              className="underline text-red-100 hover:text-white transition-colors"
            >
              hello@monire.ch
            </a>
            .
          </p>
        </div>
      )}

      <BrandButton
        type="submit"
        variant="primary"
        showStar
        className={`text-sm ${isModal ? "" : "w-full md:w-auto"}`}
      >
        {t("contact.send")}
      </BrandButton>
    </form>
  );
};

export default ContactForm;

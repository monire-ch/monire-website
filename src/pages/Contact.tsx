import { useState, useRef, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Mail, MapPin, Instagram, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import linkedinIcon from "@/assets/linkedin.svg";

const SERVICE_OPTIONS = [
  "Web Design",
  "Web Development",
  "AI Automations",
  "Website Migration",
  "SEO & Analytics",
  "Non-profit project application",
  "Other",
];

const BUDGET_OPTIONS = ["<CHF 5'000", "CHF 5'000 – 10'000", "CHF 10'000 – 20'000", "CHF 20'000+"];

interface SelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

const PageSelect: FC<SelectProps> = ({ name, label, placeholder, options, value, onChange }) => {
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
      <label className="text-off-white/70 text-sm font-body block mb-1.5">{label}</label>
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
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
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

interface MultiSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  required?: boolean;
}

const PageMultiSelect: FC<MultiSelectProps> = ({ name, label, placeholder, options, value, onChange, required }) => {
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
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };

  return (
    <div ref={ref} className="relative">
      <label className="text-off-white/70 text-sm font-body block mb-1.5">
        {label}
        {required && "*"}
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
        <ChevronDown
          className={`w-4 h-4 text-off-white/50 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[#0a3a4a] border border-off-white/20 rounded-xl overflow-hidden shadow-lg [&::-webkit-scrollbar]:hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className="w-full text-left px-4 py-3 text-sm font-body text-off-white hover:bg-off-white/10 transition-colors flex items-center gap-3"
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

const inputClasses =
  "w-full bg-off-white/10 border border-off-white/20 rounded-xl px-4 py-3.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors placeholder:text-off-white/40";

const Contact = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [fieldValues, setFieldValues] = useState({ fullName: "", email: "", message: "" });

  const errors = {
    fullName: attempted && !fieldValues.fullName.trim(),
    email:
      attempted && (!fieldValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(fieldValues.email.trim())),
    service: attempted && services.length === 0,
    message: attempted && !fieldValues.message.trim(),
    agreed: attempted && !agreed,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    if (
      !fieldValues.fullName.trim() ||
      !fieldValues.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(fieldValues.email.trim()) ||
      services.length === 0 ||
      !fieldValues.message.trim() ||
      !agreed
    )
      return;
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

  return (
    <>
      <Navbar />
      <main className="dark-teal-surface min-h-screen pt-36 md:pt-44 pb-0">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="eyebrow-pill eyebrow-pill-dark">Contact</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-off-white leading-tight mb-4">
                Let's Work Together
              </h1>
              <p className="text-off-white/60 text-lg font-body max-w-2xl mx-auto">
                Whether you have a project in mind or just want to explore possibilities, we'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 pb-24">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-10 lg:order-2">
              <ScrollReveal>
                <div>
                  <h2 className="text-gold-text text-sm tracking-widest uppercase font-body mb-6">Get in Touch</h2>
                  <a
                    href="mailto:hello@monire.ch"
                    className="flex items-center gap-3 text-off-white font-body text-lg hover:text-gold-hover transition-colors group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 group-hover:border-gold-text/60 transition-colors">
                      <Mail size={18} className="text-gold-text" />
                    </span>
                    hello@monire.ch
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div>
                  <h2 className="text-gold-text text-sm tracking-widest uppercase font-body mb-6">Location</h2>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 shrink-0">
                      <MapPin size={18} className="text-gold-text" />
                    </span>
                    <div>
                      <p className="text-off-white font-body text-lg">Zürich, Switzerland</p>
                      <p className="text-off-white/50 font-body text-sm mt-1">Serving clients worldwide</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div>
                  <h2 className="text-gold-text text-sm tracking-widest uppercase font-body mb-6">Company</h2>
                  <div className="space-y-2 text-off-white/70 font-body text-sm">
                    <p className="text-off-white text-base">Moniré</p>
                    <p>Web Design, Development & AI Automations</p>
                    <p>Zürich, Switzerland</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div>
                  <h2 className="text-gold-text text-sm tracking-widest uppercase font-body mb-6">Follow Us</h2>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/hello.monire"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 text-gold-text transition-all duration-200 hover:border-gold-text/60 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/monire"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex items-center justify-center w-10 h-10 rounded-full border border-gold-text/30 transition-all duration-200 hover:border-gold-text/60 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]"
                    >
                      <img
                        src={linkedinIcon}
                        alt=""
                        className="w-4 h-4"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)",
                        }}
                      />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="dark-surface-card rounded-2xl p-8 md:p-10 border border-off-white/[0.07] overflow-visible">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="text-gold text-5xl mb-4">✓</div>
                      <h3 className="font-body text-xl text-off-white mb-2">Thank you!</h3>
                      <p className="text-off-white/60 text-sm font-body mb-8">We'll get back to you shortly.</p>
                      <Link to="/" className="btn-outline-gold text-sm">
                        Back to Home
                      </Link>
                    </div>
                  ) : (
                    <form
                      name="contact-page"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <input type="hidden" name="form-name" value="contact-page" />
                      <input type="hidden" name="bot-field" />

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-off-white/70 text-sm font-body block mb-1.5">
                            {t("contact.fullName")}*
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            className={`${inputClasses} ${errors.fullName ? "!border-red-400" : ""}`}
                            placeholder={t("contact.fullNamePlaceholder")}
                            value={fieldValues.fullName}
                            onChange={(e) => setFieldValues((v) => ({ ...v, fullName: e.target.value }))}
                          />
                          {errors.fullName && (
                            <p className="text-red-400 text-xs font-body mt-1">Please enter your full name.</p>
                          )}
                        </div>
                        <div>
                          <label className="text-off-white/70 text-sm font-body block mb-1.5">
                            {t("contact.company")}
                          </label>
                          <input
                            type="text"
                            name="company"
                            className={inputClasses}
                            placeholder={t("contact.companyPlaceholder")}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-off-white/70 text-sm font-body block mb-1.5">
                            {t("contact.email")}*
                          </label>
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
                              {!fieldValues.email.trim()
                                ? "Please enter your email."
                                : "Please enter a valid email address."}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-off-white/70 text-sm font-body block mb-1.5">
                            {t("contact.website")}
                          </label>
                          <input
                            type="url"
                            name="website"
                            className={inputClasses}
                            placeholder={t("contact.websitePlaceholder")}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <PageMultiSelect
                          name="service"
                          label={t("contact.service")}
                          placeholder={t("contact.servicePlaceholder")}
                          options={SERVICE_OPTIONS}
                          value={services}
                          onChange={setServices}
                          required
                        />
                        <PageSelect
                          name="budget"
                          label={t("contact.budget")}
                          placeholder={t("contact.budgetPlaceholder")}
                          options={BUDGET_OPTIONS}
                          value={budget}
                          onChange={setBudget}
                        />
                      </div>
                      {errors.service && (
                        <p className="text-red-400 text-xs font-body -mt-3">Please select at least one service.</p>
                      )}

                      <div>
                        <label className="text-off-white/70 text-sm font-body block mb-1.5">
                          {t("contact.message")}*
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          className={`${inputClasses} resize-vertical ${errors.message ? "!border-red-400" : ""}`}
                          placeholder={t("contact.messagePlaceholder")}
                          value={fieldValues.message}
                          onChange={(e) => setFieldValues((v) => ({ ...v, message: e.target.value }))}
                        />
                        {errors.message && (
                          <p className="text-red-400 text-xs font-body mt-1">Please enter a message.</p>
                        )}
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-off-white/30 bg-transparent accent-gold"
                        />
                        <span className={`text-sm font-body ${errors.agreed ? "text-red-400" : "text-off-white/70"}`}>
                          {t("contact.terms")}{" "}
                          <Link to="/privacy" className="text-gold-text underline hover:text-gold transition-colors">
                            {t("contact.privacyPolicy")}
                          </Link>
                          .
                        </span>
                      </label>

                      <button type="submit" className="btn-gold text-sm w-full md:w-auto">
                        {t("contact.send")}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>

      {/* JSON-LD Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Moniré",
            url: "https://monire.ch",
            logo: "https://monire.ch/assets/monire_logo.png",
            email: "hello@monire.ch",
            description: "Custom website development and AI-powered workflow automation in Switzerland.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Zürich",
              addressCountry: "CH",
            },
            areaServed: "Worldwide",
            sameAs: ["https://www.instagram.com/hello.monire", "https://www.linkedin.com/company/monire"],
            serviceType: ["Web Design", "Web Development", "AI Automations", "Website Migration", "SEO & Analytics"],
          }),
        }}
      />

      <Footer hideWave />
    </>
  );
};

export default Contact;

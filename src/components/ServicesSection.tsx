import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import BrandButton from "./BrandButton";
import { SECTION_WRAPPER_GRADIENT } from "@/lib/theme";
import { trackEvent } from "@/lib/analytics";
import { useLocalePath } from "@/hooks/useLocalePath";

const ServicesSection = () => {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const items = t("services.items", { returnObjects: true }) as Array<{
    badge: string;
    title: string;
    desc: string;
  }>;
  const serviceLinks = [
    {
      caseStudy: "/case-studies/snip-squad",
      href: "/insights/why-your-website-might-be-losing-you-clients",
      label: t("services.insightLinks.websiteLosingClients"),
    },
    {
      caseStudy: "/case-studies/systemically",
      href: "/insights/website-builders-vs-custom-development",
      label: t("services.insightLinks.websitePlatform"),
    },
    {
      href: "/insights/website-builders-vs-custom-development",
      label: t("services.insightLinks.websitePlatform"),
    },
    {
      href: "/insights/why-your-website-might-be-losing-you-clients",
      label: t("services.insightLinks.websiteLosingClients"),
    },
    {
      caseStudy: "/case-studies/expense-receipt-automation",
      href: "/insights/what-ai-automation-actually-means-for-a-small-business",
      label: t("services.insightLinks.aiAutomation"),
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(0);
  const active = items[activeIndex];
  const activeLinks = serviceLinks[activeIndex];

  return (
    <section id="services" className="pt-16 md:pt-24 pb-40 md:pb-56 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">
            {t("services.eyebrow")}
          </span>
          <h2 className="font-body text-3xl md:text-4xl text-main-teal">
            {t("services.title")}
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: SECTION_WRAPPER_GRADIENT }}
          >
            {/* Desktop layout */}
            <div className="hidden md:flex flex-row min-h-[340px]">
              <div className="md:w-2/5 p-12 flex flex-col gap-1 border-r border-off-white/10">
                {items.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveIndex(i)}
                    className={`text-left px-5 py-3 rounded-full font-body text-[15px] transition-all duration-200 ${
                      activeIndex === i
                        ? "border border-gold/40 bg-off-white/10 text-gold-text"
                        : "text-off-white/75 hover:text-gold-text border border-transparent"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="md:w-3/5 p-12">
                <h3 className="font-body text-3xl md:text-4xl text-off-white mb-5">
                  {active.title}
                </h3>
                <p className="text-off-white font-body leading-relaxed text-base mb-8">
                  {active.desc}
                </p>
                {activeLinks && (
                  <div className="space-y-3">
                    {activeLinks.caseStudy ? (
                      <BrandButton
                        type="link"
                        to={activeLinks.caseStudy}
                        onClick={() =>
                          trackEvent("case_study_click", {
                            location: "services_section",
                            service: active.title,
                            destination: activeLinks.caseStudy,
                            page_path: window.location.pathname,
                          })
                        }
                        variant="secondary"
                        showStar
                        className="text-sm"
                      >
                        {t("services.cta")}
                      </BrandButton>
                    ) : null}
                    {activeLinks.href ? (
                      <div>
                        <Link
                          to={localePath(activeLinks.href)}
                          onClick={() =>
                            trackEvent("blog_cta_click", {
                              location: "services_section",
                              service: active.title,
                              destination: activeLinks.href,
                              page_path: window.location.pathname,
                            })
                          }
                          className="text-sm font-body text-off-white/80 hover:text-gold-text transition-colors underline hover:no-underline"
                        >
                          {activeLinks.label}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile accordion layout */}
            <div className="md:hidden p-8">
              {items.map((item, i) => {
                const isOpen = mobileOpenIndex === i;
                return (
                  <div key={item.title} className="border-b border-off-white/10 last:border-b-0">
                    <button
                      onClick={() => {
                        setMobileOpenIndex(mobileOpenIndex === i ? null : i);
                        setActiveIndex(i);
                      }}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="font-body text-lg text-gold-text">{item.title}</span>
                      <span className="text-gold-text/80 text-xl">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <p className="text-off-white/80 font-body leading-relaxed text-base pb-5">
                          {item.desc}
                        </p>
                        {serviceLinks[i] && (
                          <div className="pb-5 space-y-3">
                            {serviceLinks[i].caseStudy ? (
                              <BrandButton
                                type="link"
                                to={serviceLinks[i].caseStudy}
                                onClick={() =>
                                  trackEvent("case_study_click", {
                                    location: "services_section_mobile",
                                    service: item.title,
                                    destination: serviceLinks[i].caseStudy,
                                    page_path: window.location.pathname,
                                  })
                                }
                                variant="secondary"
                                showStar
                                className="text-sm"
                              >
                                {t("services.cta")}
                              </BrandButton>
                            ) : null}
                            {serviceLinks[i].href ? (
                              <div>
                                <Link
                                  to={localePath(serviceLinks[i].href)}
                                  onClick={() =>
                                    trackEvent("blog_cta_click", {
                                      location: "services_section_mobile",
                                      service: item.title,
                                      destination: serviceLinks[i].href,
                                      page_path: window.location.pathname,
                                    })
                                  }
                                  className="text-sm font-body text-off-white/80 hover:text-gold-text transition-colors underline hover:no-underline"
                                >
                                  {serviceLinks[i].label}
                                </Link>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;

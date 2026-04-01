import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";
import BrandButton from "./BrandButton";
import { SECTION_WRAPPER_GRADIENT } from "@/lib/theme";

const ServicesSection = () => {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as Array<{
    badge: string;
    title: string;
    desc: string;
  }>;
  const caseStudyLinks: Record<string, string> = {
    "Web Design": "/case-studies/snip-squad",
    "Web Development": "/case-studies/systemically",
    "AI Automations & Workflows": "/case-studies/expense-receipt-automation",
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(0);
  const active = items[activeIndex];

  return (
    <section id="services" className="py-20 md:py-36 pb-40 md:pb-56 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
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
                {caseStudyLinks[active.title] && (
                  <div>
                    <BrandButton type="link" to={caseStudyLinks[active.title]} variant="secondary" showStar className="text-sm">
                      {t("services.cta", "Latest case study")}
                    </BrandButton>
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
                        {caseStudyLinks[item.title] && (
                          <div className="pb-5">
                            <BrandButton type="link" to={caseStudyLinks[item.title]} variant="secondary" showStar className="text-sm">
                              {t("services.cta", "Latest case study")}
                            </BrandButton>
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

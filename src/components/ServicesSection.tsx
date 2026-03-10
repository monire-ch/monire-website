import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import StarIcon from "./StarIcon";

const ServicesSection = () => {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as Array<{
    badge: string;
    title: string;
    desc: string;
  }>;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <section id="services" className="py-20 md:py-28 px-6">
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
            style={{
              background:
                "linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)",
            }}
          >
            {/* Desktop layout */}
            <div className="hidden md:flex flex-row min-h-[340px]">
              <div className="md:w-2/5 p-10 flex flex-col gap-1 border-r border-off-white/10">
                {items.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveIndex(i)}
                    className={`text-left px-5 py-3 rounded-full font-body text-[15px] transition-all duration-200 ${
                      activeIndex === i
                        ? "border border-gold/40 bg-off-white/10 text-off-white"
                        : "text-off-white hover:text-off-white border border-transparent"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="md:w-3/5 p-10 flex flex-col justify-center">
                <h3 className="font-body text-3xl md:text-4xl text-off-white mb-5">
                  {active.title}
                </h3>
                <p className="text-off-white font-body leading-relaxed text-base mb-8">
                  {active.desc}
                </p>
                {active.badge === "Automation" && (
                  <div>
                    <Link to="/case-studies/expense-receipt-automation" className="btn-outline-gold text-sm inline-flex items-center gap-2">
                      {t("services.cta", "Latest case study")}
                      <StarIcon size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile accordion layout */}
            <div className="md:hidden p-6">
              {items.map((item, i) => {
                const isOpen = activeIndex === i;
                return (
                  <div key={item.title} className="border-b border-off-white/10 last:border-b-0">
                    <button
                      onClick={() => setActiveIndex(i)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="font-body text-lg text-off-white">{item.title}</span>
                      <span className={`text-off-white/60 text-xl transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-0'}`}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? '300px' : '0', opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="text-off-white/80 font-body leading-relaxed text-base pb-5">
                        {item.desc}
                      </p>
                      {item.badge === "Automation" && (
                        <div className="pb-5">
                          <Link to="/case-studies/expense-receipt-automation" className="btn-outline-gold text-sm">
                            {t("services.cta", "Latest case study")}
                          </Link>
                        </div>
                      )}
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

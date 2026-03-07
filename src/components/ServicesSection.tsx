import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

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
            <div className="flex flex-col md:flex-row min-h-[340px]">
              {/* Left tab nav */}
              <div className="md:w-2/5 p-8 md:p-10 flex flex-col gap-1 md:border-r border-off-white/10">
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

              {/* Right content */}
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <h3 className="font-body text-3xl md:text-4xl text-off-white mb-5">
                  {active.title}
                </h3>
                <p className="text-off-white font-body leading-relaxed text-base mb-8">
                  {active.desc}
                </p>
                {active.badge === "Automation" && (
                  <div>
                    <button className="btn-outline-gold text-sm">
                      {t("services.cta", "Latest case study")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;

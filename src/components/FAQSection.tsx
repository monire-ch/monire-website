import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const AccordionItem = ({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button onClick={toggle} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-display text-[16px] text-off-white pr-4">{q}</span>
        <span className={`accordion-icon text-off-white flex-shrink-0 ${isOpen ? 'open' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </span>
      </button>
      <div className="accordion-content" style={{ height }}>
        <div ref={contentRef} className="pb-5">
          <p className="text-off-white/70 text-[15px] font-body leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
};

type FaqCategory = {
  label: string;
  items: Array<{ q: string; a: string }>;
};

const FAQSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = t('faq.categories', { returnObjects: true }) as FaqCategory[];
  const activeCategory = categories[activeTab];

  const handleTabChange = (i: number) => {
    setActiveTab(i);
    setOpenIndex(null);
  };

  return (
    <section id="faq" className="about-flow py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="eyebrow-pill eyebrow-pill-dark mb-3">FAQ</span>
          <h2 className="font-body text-3xl md:text-4xl text-off-white">{t('faq.title')}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)',
            }}
          >
            <div className="flex flex-col md:flex-row min-h-[340px]">
              {/* Left tab nav */}
              <div className="md:w-2/5 p-8 md:p-10 flex flex-col gap-1 md:border-r border-off-white/10">
                {categories.map((cat, i) => (
                  <button
                    key={cat.label}
                    onClick={() => handleTabChange(i)}
                    className={`text-left px-5 py-3 rounded-full font-body text-[15px] transition-all duration-200 ${
                      activeTab === i
                        ? 'border border-gold/40 bg-off-white/10 text-off-white'
                        : 'text-off-white/70 hover:text-off-white border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Right content — accordion */}
              <div className="md:w-3/5 p-8 md:p-10">
                {activeCategory.items.map((faq, i) => (
                  <AccordionItem
                    key={`${activeTab}-${i}`}
                    q={faq.q}
                    a={faq.a}
                    isOpen={openIndex === i}
                    toggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;

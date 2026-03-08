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
          <p className="text-off-white text-base font-body leading-relaxed" dangerouslySetInnerHTML={{ __html: a }} />
        </div>
      </div>
    </div>
  );
};

type FaqItem = {
  q: string;
  a: string;
};

type FaqCategory = {
  label: string;
  items: FaqItem[];
};

const isFaqCategoryArray = (value: unknown): value is FaqCategory[] => {
  return (
    Array.isArray(value) &&
    value.every(
      (category) =>
        typeof category === 'object' &&
        category !== null &&
        'label' in category &&
        'items' in category &&
        Array.isArray((category as FaqCategory).items)
    )
  );
};

const FAQSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const rawCategories = t('faq.categories', { returnObjects: true });
  const rawItems = t('faq.items', { returnObjects: true });

  const categories: FaqCategory[] = isFaqCategoryArray(rawCategories)
    ? rawCategories
    : Array.isArray(rawItems)
      ? [{ label: t('faq.title'), items: rawItems as FaqItem[] }]
      : [];

  const safeActiveTab = Math.min(activeTab, Math.max(categories.length - 1, 0));
  const activeCategory = categories[safeActiveTab];

  const handleTabChange = (i: number) => {
    setActiveTab(i);
    setOpenIndex(null);
  };

  return (
    <section id="faq" className="about-flow py-20 md:py-36 pb-40 md:pb-56 px-6 relative">
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
              <div className="md:w-2/5 p-6 md:p-10 pb-2 md:pb-10 flex flex-col gap-1 md:border-r border-off-white/10">
                {categories.map((cat, i) => (
                  <button
                    key={cat.label}
                    onClick={() => handleTabChange(i)}
                    className={`text-left px-5 py-3 rounded-full font-body text-[15px] transition-all duration-200 ${
                      activeTab === i
                        ? 'border border-gold/40 bg-off-white/10 text-off-white'
                        : 'text-off-white hover:text-off-white border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Right content — accordion */}
              <div className="md:w-3/5 p-6 pt-0 md:p-10">
                <div className="border-t border-white/10 md:border-t-0"></div>
                {(activeCategory?.items ?? []).map((faq, i) => (
                  <AccordionItem
                    key={`${safeActiveTab}-${i}`}
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

      <div className="absolute -bottom-px left-0 right-0 wave-mask">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default FAQSection;

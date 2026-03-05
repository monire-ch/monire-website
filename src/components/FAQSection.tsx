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
    <div className="border-b border-white/10">
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

const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-body text-3xl md:text-4xl text-main-teal">{t('faq.title')}</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-neutral-card rounded-xl border border-neutral-border p-6 md:p-8">
            {items.map((faq, i) => (
              <AccordionItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;

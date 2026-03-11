import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const AccordionItem = ({
  question,
  answer,
  isExpanded,
  onToggle,
}: {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-display text-[16px] text-off-white/90 pr-4">{question}</span>
        <span className={`accordion-icon text-off-white flex-shrink-0 ${isExpanded ? 'open' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </span>
      </button>
      <div className="accordion-content" style={{ height }}>
        <div ref={contentRef} className="pb-5">
          <p className="text-off-white text-base font-body leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
};

const MobileFaqCategory = ({
  category,
  categoryIndex,
  isExpanded,
  onToggleCategory,
  expandedQuestionIndex,
  setExpandedQuestionIndex,
}: {
  category: FaqCategory;
  categoryIndex: number;
  isExpanded: boolean;
  onToggleCategory: () => void;
  expandedQuestionIndex: number | null;
  setExpandedQuestionIndex: (index: number | null) => void;
}) => {
  return (
    <div className="border-b border-off-white/10 last:border-b-0">
      <button onClick={onToggleCategory} className="w-full flex items-center justify-between py-4 text-left">
        <span className="font-body text-lg text-gold-text">{category.label}</span>
        <span className="text-gold-text/80 text-xl">{isExpanded ? '−' : '+'}</span>
      </button>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 pb-2">
          {category.items.map((faqItem, questionIndex) => (
            <AccordionItem
              key={`${categoryIndex}-${questionIndex}`}
              question={faqItem.q}
              answer={faqItem.a}
              isExpanded={expandedQuestionIndex === questionIndex}
              onToggle={() =>
                setExpandedQuestionIndex(expandedQuestionIndex === questionIndex ? null : questionIndex)
              }
            />
          ))}
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
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [expandedMobileCategoryIndex, setExpandedMobileCategoryIndex] = useState<number | null>(0);
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState<number | null>(null);

  const rawCategories = t('faq.categories', { returnObjects: true });
  const rawItems = t('faq.items', { returnObjects: true });

  const categories: FaqCategory[] = isFaqCategoryArray(rawCategories)
    ? rawCategories
    : Array.isArray(rawItems)
      ? [{ label: t('faq.title'), items: rawItems as FaqItem[] }]
      : [];

  const safeActiveCategoryIndex = Math.min(activeCategoryIndex, Math.max(categories.length - 1, 0));
  const activeCategory = categories[safeActiveCategoryIndex];

  const handleCategoryChange = (categoryIndex: number) => {
    setActiveCategoryIndex(categoryIndex);
    setExpandedMobileCategoryIndex(categoryIndex);
    setExpandedQuestionIndex(null);
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
            {/* Desktop layout */}
            <div className="hidden md:flex flex-row min-h-[340px]">
              <div className="md:w-2/5 p-10 flex flex-col gap-1 border-r border-off-white/10">
                {categories.map((category, categoryIndex) => (
                  <button
                    key={category.label}
                    onClick={() => handleCategoryChange(categoryIndex)}
                    className={`text-left px-5 py-3 rounded-full font-body text-[15px] transition-all duration-200 ${
                      activeCategoryIndex === categoryIndex
                        ? 'border border-gold/40 bg-off-white/10 text-gold-text'
                        : 'text-off-white/75 hover:text-gold-text border border-transparent'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <div className="md:w-3/5 p-10">
                {(activeCategory?.items ?? []).map((faqItem, questionIndex) => (
                  <AccordionItem
                    key={`${safeActiveCategoryIndex}-${questionIndex}`}
                    question={faqItem.q}
                    answer={faqItem.a}
                    isExpanded={expandedQuestionIndex === questionIndex}
                    onToggle={() =>
                      setExpandedQuestionIndex(expandedQuestionIndex === questionIndex ? null : questionIndex)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Mobile accordion layout */}
            <div className="md:hidden p-6">
              {categories.map((category, categoryIndex) => {
                const isCategoryExpanded = expandedMobileCategoryIndex === categoryIndex;
                return (
                  <MobileFaqCategory
                    key={category.label}
                    category={category}
                    categoryIndex={categoryIndex}
                    isExpanded={isCategoryExpanded}
                    onToggleCategory={() => {
                      const nextExpandedCategoryIndex =
                        expandedMobileCategoryIndex === categoryIndex ? null : categoryIndex;
                      setExpandedMobileCategoryIndex(nextExpandedCategoryIndex);
                      if (nextExpandedCategoryIndex !== null) {
                        setActiveCategoryIndex(categoryIndex);
                      }
                      setExpandedQuestionIndex(null);
                    }}
                    expandedQuestionIndex={expandedQuestionIndex}
                    setExpandedQuestionIndex={setExpandedQuestionIndex}
                  />
                );
              })}
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

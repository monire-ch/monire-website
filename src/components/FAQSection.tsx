import { useState, useRef, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  { q: 'How long does it take to build a website?', a: 'Typically 4–8 weeks depending on the project scope. We\'ll give you a clear timeline during our discovery call.' },
  { q: 'Do I need to provide content?', a: 'It helps if you have content ready, but we can guide you through the process and help with copywriting if needed.' },
  { q: 'What platform do you build on?', a: 'We primarily use modern frameworks like React and Next.js, along with headless CMS solutions. We choose the best stack for your specific needs.' },
  { q: 'Can I update the website myself?', a: 'Absolutely! Every website comes with a user-friendly CMS. We also provide training so you feel confident making updates.' },
  { q: 'Do you offer ongoing support?', a: 'Yes, our Advanced and Premium plans include monthly maintenance hours. We also offer standalone support packages.' },
  { q: 'What if I need changes after launch?', a: 'We offer flexible support options. Small changes are often covered by maintenance hours, and larger updates can be quoted separately.' },
];

const AccordionItem = ({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-neutral-border">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-display text-base text-deep-ink pr-4">{q}</span>
        <span className={`accordion-icon text-main-teal flex-shrink-0 ${isOpen ? 'open' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </span>
      </button>
      <div className="accordion-content" style={{ height }}>
        <div ref={contentRef} className="pb-5">
          <p className="text-deep-ink/70 text-sm font-body leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink">Frequently Asked Questions</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-neutral-card rounded-xl border border-neutral-border p-6 md:p-8">
            {faqs.map((faq, i) => (
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

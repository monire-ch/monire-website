import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">Let's Talk</p>
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink mb-6">Interested In Working With Us?</h2>
          <a href="#" className="btn-teal inline-block text-sm">
            Book a discovery call
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;

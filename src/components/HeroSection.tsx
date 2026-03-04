import { useEffect, useState } from 'react';
import { useFontsLoaded } from '@/hooks/useFontsLoaded';

const HeroSection = () => {
  const fontsLoaded = useFontsLoaded();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [fontsLoaded]);

  const headline = "Websites built to attract clients and grow with your business";
  const words = headline.split(' ');

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center text-center px-6 pt-24 pb-32">
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <p
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} text-gold-text text-sm tracking-widest uppercase font-body mb-6`}
          style={{ transitionDelay: '220ms' }}
        >
          Web Design & Automation Agency
        </p>

        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-off-white mb-6">
          {words.map((word, i) => (
            <span
              key={i}
              className={`hero-word ${animate ? 'visible' : ''}`}
              style={{
                transitionDelay: `${60 * i}ms`,
              }}
            >
              {word === 'attract' ? (
                <em className="italic text-gold-text">{word}</em>
              ) : (
                word
              )}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} text-off-white/70 text-base md:text-lg font-body max-w-xl mx-auto mb-8`}
          style={{ transitionDelay: '320ms' }}
        >
          We build beautiful, high-performing websites and automate your workflows so you can focus on what matters most.
        </p>

        {/* CTA */}
        <div
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''}`}
          style={{ transitionDelay: '420ms' }}
        >
          <a href="#services" className="btn-gold inline-block text-sm">
            Book a free discovery call →
          </a>
        </div>
      </div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0 wave-mask">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

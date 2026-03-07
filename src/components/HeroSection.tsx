import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFontsLoaded } from '@/hooks/useFontsLoaded';
import goldFill from '@/assets/gold-fill.webp';

const HeroSection = () => {
  const { t } = useTranslation();
  const fontsLoaded = useFontsLoaded();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [fontsLoaded]);

  const headline = t('hero.headline');
  const highlightWord = t('hero.highlightWord');
  const words = headline.split(' ');

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center text-center px-6 pt-24 pb-32">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} flex items-center justify-center gap-4 mb-6`}
          style={{ transitionDelay: '220ms' }}
        >
          <span className="hidden sm:block w-12 h-px bg-off-white/30" />
          <p className="text-off-white/70 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-body">
            {t('hero.eyebrow')}
          </p>
          <span className="hidden sm:block w-12 h-px bg-off-white/30" />
        </div>

        <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[67px] leading-[1.2] tracking-[-0.01em] mb-8">
          {words.map((word, i) => (
            <span
              key={i}
              className={`hero-word ${animate ? 'visible' : ''} inline-block pb-2`}
              style={{
                transitionDelay: `${60 * i}ms`,
                backgroundImage: `url(${goldFill})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {word === highlightWord ? (
                <em className="italic font-serif">{word}</em>
              ) : (
                word
              )}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>

        <p
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} text-off-white text-lg md:text-xl font-body max-w-xl mx-auto mb-8`}
          style={{ transitionDelay: '320ms' }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''}`}
          style={{ transitionDelay: '420ms' }}
        >
          <a href="#services" className="btn-gold inline-block text-sm">
            {t('hero.cta')}
          </a>
        </div>
      </div>

      <div className="absolute -bottom-px left-0 right-0 wave-mask">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

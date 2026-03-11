import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFontsLoaded } from '@/hooks/useFontsLoaded';
import goldFill from '@/assets/gold-fill.webp';
import StarIcon from './StarIcon';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    <section className="hero-bg relative min-h-screen flex items-center justify-center text-center px-6 pt-36 md:pt-48 pb-44 md:pb-56">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} flex items-center justify-center gap-4 md:gap-6 mb-8`}
          style={{ transitionDelay: '220ms' }}
        >
          <span className="block w-10 md:w-20 h-px bg-off-white/30" />
          <p className="text-off-white/75 text-[10px] sm:text-xs tracking-[0.23em] uppercase font-body font-medium">
            {t('hero.eyebrow')}
          </p>
          <span className="block w-10 md:w-20 h-px bg-off-white/30" />
        </div>

        <h1 className="font-serif text-[30px] sm:text-[50px] md:text-[74px] leading-[1.16] tracking-[-0.015em] mb-8 md:mb-10">
          {words.map((word, i) => (
            <span
              key={i}
              className={`hero-word ${animate ? 'visible' : ''} inline-block pb-2`}
              style={{
                transitionDelay: `${60 * i}ms`,
                backgroundImage: `url(${goldFill})`,
                backgroundSize: '180% auto',
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
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} text-off-white/90 text-lg md:text-xl font-body max-w-3xl mx-auto mb-8 md:mb-10 leading-[1.45]`}
          style={{ transitionDelay: '320ms' }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''}`}
          style={{ transitionDelay: '420ms' }}
        >
          <button onClick={() => navigate('/contact')} className="hero-cta inline-flex items-center gap-3 text-sm">
            <span>{t('hero.cta')}</span>
            <span className="hero-cta-icon">
              <StarIcon size={16} />
            </span>
          </button>
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

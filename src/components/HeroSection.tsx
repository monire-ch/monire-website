import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFontsLoaded } from '@/hooks/useFontsLoaded';
import goldFill from '@/assets/gold-fill.webp';
import BrandButton from './BrandButton';
import { trackEvent } from '@/lib/analytics';
import { useLocalePath } from '@/hooks/useLocalePath';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const fontsLoaded = useFontsLoaded();
  const [animate, setAnimate] = useState(false);
  const isGerman = i18n.resolvedLanguage === 'de';

  useEffect(() => {
    if (fontsLoaded) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [fontsLoaded]);

  const headline = t('hero.headline');
  const highlightWord = t('hero.highlightWord');
  const words = headline.split(' ');

  const scrollToPortfolio = () => {
    trackEvent('portfolio_click', {
      location: 'hero',
      label: 'view_our_work',
      destination: '#portfolio',
      page_path: window.location.pathname,
    });
    window.history.pushState(null, '', '#portfolio');
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center text-center px-6 pt-36 md:pt-48 pb-44 md:pb-56">
      <div className="relative z-10 max-w-5xl mx-auto px-2 xs:px-8">
        <div
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} flex items-center justify-center gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-6 lg:mb-8 max-[465px]:mb-4 max-[465px]:gap-2`}
          style={{ transitionDelay: '220ms' }}
        >
          <span className="block w-10 md:w-20 h-px bg-off-white/30" />
          <p className="text-off-white/90 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-body font-semibold">
            {t('hero.eyebrow')}
          </p>
          <span className="block w-10 md:w-20 h-px bg-off-white/30" />
        </div>

        <h1
          className={`hero-title text-[36px] sm:text-[50px] md:text-[68px] mb-6 md:mb-7 lg:mb-10 max-[465px]:mb-4 ${
            isGerman ? 'max-w-3xl lg:max-w-4xl' : 'max-w-3xl'
          }`}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`hero-word ${animate ? 'visible' : ''} inline-block pb-2`}
              style={{
                transitionDelay: `${60 * i}ms`,
                backgroundImage: `url(${goldFill})`,
                backgroundSize: '100% auto',
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
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} text-off-white/90 text-base md:text-xl font-body mx-auto px-6 lg:px-0 mb-6 md:mb-7 lg:mb-10 leading-[1.45] max-[465px]:mb-4 ${
            isGerman ? 'max-w-xl lg:max-w-2xl' : 'max-w-xl'
          }`}
          style={{ transitionDelay: '320ms' }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          className={`hero-fade-enter ${animate ? 'hero-fade-visible' : ''} flex flex-col items-center justify-center gap-3 sm:flex-row`}
          style={{ transitionDelay: '420ms' }}
        >
          <BrandButton
            type="button"
            onClick={() => {
              trackEvent('contact_click', { location: 'hero', label: 'hero', destination: '/contact', page_path: window.location.pathname });
              navigate(localePath('/contact'));
            }}
            variant="hero"
            showStar
            className="text-base"
          >
            {t('hero.cta')}
          </BrandButton>
          <BrandButton
            type="button"
            onClick={scrollToPortfolio}
            variant="secondary"
            className="text-base"
          >
            {t('hero.workCta')}
          </BrandButton>
        </div>
      </div>

      <div className="absolute -bottom-1.5 left-0 right-0 wave-mask">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" className="block h-10 w-full md:h-auto">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

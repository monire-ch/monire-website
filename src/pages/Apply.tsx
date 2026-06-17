import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import ContactModal from '@/components/ContactModal';
import BrandButton from '@/components/BrandButton';
import { trackEvent } from '@/lib/analytics';

const Apply = () => {
  const { t } = useTranslation();
  const [contactOpen, setContactOpen] = useState(false);
  const steps = t('apply.steps', { returnObjects: true }) as Array<{ step: string; title: string; desc: string }>;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(rgb(5 40 50) 50%, rgb(3 38 48) 100%)' }}>
      <div className="about-orb about-orb-2" style={{ bottom: '120px', left: '-40px', width: '320px', height: '320px', background: 'rgba(120, 200, 255, 0.25)' }} />
      <Navbar />

      <main>
      <section className="pt-32 pb-32 md:pt-40 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <Link to="/#about" className="text-sm text-off-white/50 hover:text-off-white/80 font-body transition-colors">
              {t('apply.back')}
            </Link>
          </ScrollReveal>

          <ScrollReveal className="mb-10">
            <span className="eyebrow-pill eyebrow-pill-dark mb-3">{t('apply.eyebrow')}</span>
            <h1 className="font-body text-3xl md:text-5xl text-off-white mb-6">
              {t('apply.title')}
            </h1>
            <p className="text-base md:text-lg text-off-white/70 font-body leading-relaxed max-w-2xl">
              {t('apply.intro')}
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-14">
            <p className="text-sm text-gold-text font-body mb-2">
              {t('apply.status')}
            </p>
          </ScrollReveal>

          <ScrollReveal className="mb-8">
            <h2 className="font-body text-2xl md:text-3xl text-off-white mb-8">{t('apply.howItWorks')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {steps.map((s, i) => {
              const isDark = i % 2 === 1;
              return (
                <ScrollReveal key={s.step} delay={i * 150}>
                  <div
                    className={`rounded-lg p-6 h-full ${
                      isDark
                        ? 'border border-white/10 text-off-white'
                        : 'border border-white/10'
                    }`}
                    style={{
                      background: isDark
                        ? 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)'
                        : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <span className="text-xs uppercase tracking-widest text-gold-text font-body mb-3 block">
                      {s.step}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl mb-2 text-off-white">{s.title}</h3>
                    <p className="text-base font-body leading-relaxed text-off-white/70">{s.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="flex items-center gap-4">
              <BrandButton
                variant="secondary"
                className="text-sm"
                onClick={() => {
                  trackEvent('contact_click', { location: 'apply', label: 'apply', page_path: window.location.pathname });
                  setContactOpen(true);
                }}
              >
                {t('apply.cta')}
              </BrandButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </main>

      <div className="border-t border-off-white/10 mx-6" />
      <Footer hideWave />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} source="apply" />
    </div>
  );
};

export default Apply;

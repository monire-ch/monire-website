import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const tabKeys = ['webDesign', 'automation'] as const;

const PricingSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<typeof tabKeys[number]>('webDesign');

  const plans = t(`pricing.plans.${activeTab}`, { returnObjects: true }) as Array<{
    name: string; price: string; features: string[];
  }>;

  // Mark the middle plan as featured
  const plansWithFeatured = plans.map((p, i) => ({ ...p, featured: i === 1 }));

  return (
    <section id="pricing" className="dark-teal-surface py-20 md:py-28 px-6 relative">
      <div className="absolute -top-px left-0 right-0 wave-mask-dark rotate-180">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full block">
          <path fill="currentColor" d="M0,48 C190,100 405,102 720,68 C1018,36 1240,32 1440,74 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12">
          <span className="eyebrow-pill eyebrow-pill-dark mb-3">{t('pricing.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-off-white">
            {t('pricing.title')} <em className="italic font-tertiary text-off-white">{t('pricing.titleAccent')}</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-off-white/20 p-1.5 gap-1">
            {tabKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-8 py-3 rounded-full text-sm font-body transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-main-teal text-off-white border border-gold/50'
                    : 'text-off-white/60 hover:text-off-white/80 border border-transparent'
                }`}
              >
                {t(`pricing.tabs.${key}`)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plansWithFeatured.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div
                className={`rounded-xl p-7 h-full flex flex-col ${
                  plan.featured
                    ? 'featured-teal-card border border-gold/30'
                    : 'dark-surface-card border border-off-white/10'
                }`}
              >
                <p className="text-gold-text text-xs tracking-widest uppercase font-body mb-1">{plan.name}</p>
                <p className="font-body text-2xl text-off-white mb-5">{plan.price}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-off-white/70 text-[14px] font-body flex items-start gap-2">
                      <span className="text-gold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={plan.featured ? 'btn-gold text-sm w-full' : 'btn-outline-gold text-sm w-full'}>
                  {t('pricing.getStarted')}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-14">
          <h3 className="font-body text-xl text-off-white mb-2">{t('pricing.custom.title')}</h3>
          <p className="text-off-white/60 text-[15px] font-body max-w-lg mx-auto">
            {t('pricing.custom.desc')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingSection;

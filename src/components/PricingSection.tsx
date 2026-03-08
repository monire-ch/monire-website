import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import ContactModal from './ContactModal';


const tabKeys = ['webDesign', 'automation'] as const;

const PricingSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof tabKeys[number]>('webDesign');
  const [contactOpen, setContactOpen] = useState(false);

  const plans = t(`pricing.plans.${activeTab}`, { returnObjects: true }) as Array<{
    name: string; price: string; desc: string; features: string[];
  }>;

  const plansWithFeatured = plans.map((p, i) => ({ ...p, featured: i === 1 }));

  // Split price into "from" prefix and amount
  const splitPrice = (price: string) => {
    const match = price.match(/^(from\s*)(.*)/i);
    if (match) return { prefix: match[1], amount: match[2] };
    return { prefix: '', amount: price };
  };

  return (
    <>
    <section id="pricing" className="dark-teal-surface py-20 md:py-28 px-6 relative">

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
                className={`whitespace-nowrap px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-body transition-all duration-200 ${
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

        {activeTab === 'automation' ? (
          <ScrollReveal>
            <div className="rounded-xl dark-surface-card border border-off-white/10 p-10 md:p-14 text-center">
              <h3 className="font-display text-3xl md:text-4xl text-off-white mb-4">
                {t('pricing.automationBlock.title')}
              </h3>
              <p className="text-off-white text-base font-body leading-relaxed max-w-2xl mx-auto mb-8">
                {t('pricing.automationBlock.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-gold text-sm" onClick={() => setContactOpen(true)}>
                  {t('pricing.automationBlock.cta')}
                </button>
                <button className="btn-outline-gold text-sm" onClick={() => navigate('/case-studies/expense-receipt-automation')}>
                  {t('pricing.automationBlock.caseStudy')}
                </button>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            {plansWithFeatured.map((plan, i) => {
              const { prefix, amount } = splitPrice(plan.price);
              return (
                <ScrollReveal key={plan.name} delay={i * 100}>
                  <div className="relative">
                    {plan.featured && (
                      <div className="flex justify-center">
                        <span className="inline-block bg-gold text-main-teal text-xs font-body font-medium tracking-wide uppercase px-4 py-1.5 rounded-t-lg">
                          {t('pricing.mostPopular')}
                        </span>
                      </div>
                    )}
                    <div
                      className={`rounded-xl p-8 flex flex-col ${
                        plan.featured
                          ? 'bg-off-white text-deep-ink md:py-12'
                          : 'dark-surface-card border border-off-white/10'
                      }`}
                    >
                      <p className={`font-display text-2xl md:text-3xl mb-4 ${
                        plan.featured ? 'text-deep-ink' : 'text-off-white'
                      }`}>
                        {plan.name}
                      </p>
                      <div className="mb-3">
                        <span className={`text-sm font-body ${plan.featured ? 'text-deep-ink/60' : 'text-off-white'}`}>
                          {prefix}
                        </span>
                        <span className={`font-display text-3xl md:text-4xl ${
                          plan.featured ? 'text-gold' : 'text-gold-text'
                        }`}>
                          {amount}
                        </span>
                      </div>
                      <p className={`text-base font-body mb-6 leading-relaxed ${
                        plan.featured ? 'text-deep-ink/70' : 'text-off-white'
                      }`}>
                        {plan.desc}
                      </p>
                      <ul className="space-y-2.5 mb-8 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className={`text-[14px] font-body flex items-start gap-2.5 ${
                            plan.featured ? 'text-deep-ink/80' : 'text-off-white'
                          }`}>
                            <span className={`mt-0.5 text-sm ${plan.featured ? 'text-main-teal' : 'text-gold'}`}>✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => setContactOpen(true)} className={`text-sm w-full rounded-full px-6 py-3.5 font-body font-medium transition-all duration-200 ${
                        plan.featured
                          ? 'bg-main-teal text-off-white hover:bg-soft-teal'
                          : 'btn-outline-gold'
                      }`}>
                        {t('pricing.getStarted')}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {activeTab !== 'automation' && (
          <ScrollReveal className="text-center mt-14">
            <h4 className="font-body text-2xl md:text-[32px] text-off-white mb-4">{t('pricing.custom.title')}</h4>
            <p className="text-off-white text-[15px] font-body">
              {t('pricing.custom.desc')}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
    <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default PricingSection;

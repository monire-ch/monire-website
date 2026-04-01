import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import ContactModal from './ContactModal';
import StarIcon from './StarIcon';
import {
  CURRENCY_STORAGE_KEY,
  detectCurrencyFromCountry,
  getWebDesignDisplayPrice,
  isDisplayCurrency,
  SUPPORTED_CURRENCIES,
  type DisplayCurrency,
  WEB_DESIGN_PLAN_ORDER,
} from '@/config/pricing';

const tabKeys = ['webDesign', 'automation'] as const;
const detectCurrencyFromLocation = async (): Promise<DisplayCurrency> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Geo lookup failed');

    const data = (await response.json()) as { country_code?: string };
    return detectCurrencyFromCountry(data.country_code);
  } catch {
    return 'USD';
  }
};

const PricingSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof tabKeys[number]>('webDesign');
  const [contactOpen, setContactOpen] = useState(false);
  const [currency, setCurrency] = useState<DisplayCurrency>('CHF');

  const plans = t(`pricing.plans.${activeTab}`, { returnObjects: true }) as Array<{
    name: string; price: string; desc: string; features: string[];
  }>;

  const plansWithFeatured = plans.map((p, i) => ({ ...p, featured: i === 1 }));

  useEffect(() => {
    let isCancelled = false;

    const savedCurrency = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (isDisplayCurrency(savedCurrency)) {
      setCurrency(savedCurrency);
      return () => {
        isCancelled = true;
      };
    }

    const setAutoCurrency = async () => {
      const detectedCurrency = await detectCurrencyFromLocation();
      if (!isCancelled) setCurrency(detectedCurrency);
    };

    void setAutoCurrency();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleCurrencyChange = (nextCurrency: DisplayCurrency) => {
    setCurrency(nextCurrency);
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, nextCurrency);
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
          <div className="inline-flex rounded-full border border-off-white/20 p-1.5 gap-1 max-w-full overflow-x-auto">
            {tabKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`whitespace-nowrap px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full text-[10px] xs:text-xs md:text-sm font-body transition-all duration-200 ${
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

        <ScrollReveal className="flex justify-center mb-8">
          <div
            className="inline-flex items-center rounded-full border border-off-white/10 p-1 gap-0.5"
            aria-label={t('pricing.currencyLabel', { defaultValue: 'Currency' })}
            role="group"
          >
            {SUPPORTED_CURRENCIES.map((currencyKey) => (
              <button
                key={currencyKey}
                onClick={() => handleCurrencyChange(currencyKey)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-body transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 ${
                  currency === currencyKey
                    ? 'bg-off-white/10 text-off-white'
                    : 'text-off-white/45 hover:text-off-white/70'
                }`}
                aria-pressed={currency === currencyKey}
              >
                {currencyKey}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {activeTab === 'webDesign' && (
          <ScrollReveal className="text-center mb-12">
            <p className="text-off-white/85 text-xs sm:text-sm font-body tracking-[0.04em]">
              Each plan includes everything from the previous tier.
            </p>
          </ScrollReveal>
        )}

        {activeTab === 'automation' ? (
          <ScrollReveal>
            <div className="rounded-xl dark-surface-card border border-off-white/10 p-10 md:p-14 text-center">
              <h3 className="font-display text-3xl md:text-4xl text-off-white mb-4">
                {t('pricing.automationBlock.title')}
              </h3>
              <p className="text-off-white text-base font-body leading-relaxed max-w-2xl mx-auto mb-8">
                {t('pricing.automationBlock.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button className="btn-gold text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto !py-2.5" onClick={() => setContactOpen(true)}>
                  {t('pricing.automationBlock.cta')}
                  <StarIcon />
                </button>
                <button className="btn-outline-gold text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto !py-2.5" onClick={() => navigate('/case-studies/expense-receipt-automation')}>
                  {t('pricing.automationBlock.caseStudy')}
                </button>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            {plansWithFeatured.map((plan, i) => {
              const planKey = WEB_DESIGN_PLAN_ORDER[i];
              const { prefix, amount: displayAmount } = planKey
                ? getWebDesignDisplayPrice(planKey, currency)
                : { prefix: '', amount: plan.price };
              return (
                <ScrollReveal key={plan.name} delay={i * 100}>
                  <div className={`relative ${plan.featured ? 'md:-translate-y-[7px]' : ''}`}>
                    {plan.featured && (
                      <div className="flex justify-center relative z-10 -mb-4">
                        <span className="inline-block bg-gold text-main-teal text-xs font-body font-semibold tracking-wide px-5 py-1.5 rounded-full shadow-md">
                          {t('pricing.mostPopular')}
                        </span>
                      </div>
                    )}
                    <div
                      className={`rounded-xl p-8 md:min-h-[935px] lg:min-h-[650px] flex flex-col ${
                        plan.featured
                          ? 'bg-off-white text-deep-ink'
                          : 'dark-surface-card border border-off-white/10'
                      }`}
                    >
                      <p className={`font-display text-2xl md:text-3xl mb-4 ${
                        plan.featured ? 'text-deep-ink' : 'text-off-white'
                      }`}>
                        {plan.name}
                      </p>
                      <div className="mb-3 whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap">
                        <span
                          className={`text-sm font-body inline mr-1 md:block md:mr-0 md:mb-0.5 lg:inline lg:mr-1 lg:mb-0 ${
                            plan.featured ? 'text-deep-ink/60' : 'text-off-white'
                          }`}
                        >
                          {prefix}
                        </span>
                        <span className={`font-display text-3xl md:text-4xl ${
                          plan.featured ? 'text-gold' : 'text-gold-text'
                        }`}>
                          {displayAmount}
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
                      <button onClick={() => setContactOpen(true)} className={`text-sm w-full rounded-full px-6 py-3.5 font-body font-medium transition-all duration-200 inline-flex items-center justify-center gap-2 ${
                        plan.featured
                          ? 'btn-teal !bg-main-teal hover:!bg-soft-teal'
                          : 'btn-outline-gold'
                      }`}>
                        {t('pricing.getStarted')}
                        <StarIcon />
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
            <h3 className="font-body text-2xl md:text-[32px] text-off-white mb-4">{t('pricing.custom.title')}</h3>
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

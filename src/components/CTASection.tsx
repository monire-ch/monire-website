import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import BrandButton from './BrandButton';
import { trackEvent } from '@/lib/analytics';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 pb-32 md:pb-40 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="rounded-xl border border-border bg-card p-8 md:p-12 text-center">
            <h2 className="font-body text-3xl md:text-4xl text-main-teal mb-6">{t('cta.title')}</h2>
            <p className="text-main-teal/80 text-base md:text-lg font-body max-w-2xl mx-auto mb-8">
              {t('cta.subtext')}
            </p>
            <BrandButton
              type="link"
              to="/contact"
              onClick={() => {
                trackEvent('contact_click', { location: 'bottom_cta', label: 'bottom_cta', destination: '/contact', page_path: window.location.pathname });
              }}
              variant="primary"
              showStar
              className="text-sm"
            >
              {t('cta.button')}
            </BrandButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;

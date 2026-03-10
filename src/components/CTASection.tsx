import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import StarIcon from './StarIcon';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 pb-32 md:pb-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('cta.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-main-teal mb-6">{t('cta.title')}</h2>
          <a href="/contact" className="btn-teal inline-flex items-center gap-2 text-sm">
            {t('cta.button')}
            <StarIcon />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;

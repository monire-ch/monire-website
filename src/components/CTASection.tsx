import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">{t('cta.eyebrow')}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink mb-6">{t('cta.title')}</h2>
          <a href="#" className="btn-teal inline-block text-sm">
            {t('cta.button')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;

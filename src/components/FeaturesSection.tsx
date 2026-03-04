import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const FeaturesSection = () => {
  const { t } = useTranslation();
  const items = t('features.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('features.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-deep-ink">
            {t('features.title')}
            <span className="block mt-2 italic font-tertiary text-main-teal">{t('features.titleAccent')}</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((f, i) => {
            const isDark = i % 2 === 1;
            return (
              <ScrollReveal key={f.title} delay={i * 150}>
                <div
                  className={`rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300 ${
                    isDark
                      ? 'border border-white/10 text-off-white'
                      : 'bg-neutral-card border border-neutral-border'
                  }`}
                  style={isDark ? { background: 'linear-gradient(145deg, #053e50d9 0%, #032c39eb 100%)' } : undefined}
                >
                  <h3 className={`font-display text-xl md:text-2xl mb-2 ${isDark ? 'text-off-white' : 'text-deep-ink'}`}>{f.title}</h3>
                  <p className={`text-base font-body leading-relaxed ${isDark ? 'text-off-white/70' : 'text-deep-ink/70'}`}>{f.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

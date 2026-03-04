import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';

const FeaturesSection = () => {
  const { t } = useTranslation();
  const items = t('features.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">{t('features.eyebrow')}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-deep-ink">
            {t('features.title')}{' '}
            <span className="italic text-main-teal">{t('features.titleAccent')}</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="bg-neutral-card border border-neutral-border rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-display text-lg text-deep-ink mb-2">{f.title}</h3>
                <p className="text-[15px] text-deep-ink/70 font-body leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

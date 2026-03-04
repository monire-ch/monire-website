import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import n8nPreview from '@/assets/n8n_preview.webp';

const visuals = [null, n8nPreview];

const ServicesSection = () => {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as Array<{ badge: string; title: string; desc: string }>;

  return (
    <section id="services" className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm tracking-widest uppercase font-body mb-3">{t('services.eyebrow')}</p>
          <h2 className="font-body text-3xl md:text-4xl text-deep-ink">
            {t('services.title')}<br />
            <span className="italic font-tertiary">{t('services.titleAccent')}</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {items.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 120}>
              <div className="dark-teal-surface rounded-xl overflow-hidden">
                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                  {visuals[i] && (
                    <div className="md:w-1/3 flex-shrink-0">
                      <img src={visuals[i]!} alt={s.title} className="rounded-lg w-full" />
                    </div>
                  )}
                  <div className={visuals[i] ? 'md:w-2/3' : 'w-full'}>
                    <span className="text-gold-text text-xs tracking-widest uppercase font-body mb-2 block">{s.badge}</span>
                    <h3 className="font-body text-2xl md:text-3xl text-off-white mb-3">{s.title}</h3>
                    <p className="text-off-white/70 font-body leading-relaxed text-[15px]">{s.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

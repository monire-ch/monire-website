import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import monika from '@/assets/monika.jpg';
import nicole from '@/assets/nicole.jpg';

const teamImages = [monika, nicole];

const AboutSection = () => {
  const { t } = useTranslation();
  const stories = t('about.stories', { returnObjects: true }) as Array<{ title: string; text: string }>;
  const team = t('about.team', { returnObjects: true }) as Array<{ name: string; role: string }>;

  return (
    <div className="about-flow relative overflow-hidden">
      <div className="about-orb about-orb-1" />
      <div className="about-orb about-orb-2" />
      <section id="about" className="relative py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="eyebrow-pill eyebrow-pill-light mb-3">{t('about.eyebrow')}</span>
          <h2 className="font-body text-3xl md:text-4xl text-deep-ink">{t('about.title')}</h2>
        </ScrollReveal>

        <div className="space-y-12 mb-20">
          {stories.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start">
                <h3 className="font-body text-xl md:text-2xl text-deep-ink">{item.title}</h3>
                <p className="text-[15px] text-deep-ink/70 font-body leading-relaxed">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h3 className="font-body text-2xl text-deep-ink mb-8">{t('about.teamTitle')}</h3>
          <div className="flex flex-wrap gap-8 justify-start">
            {team.map((person, i) => (
              <div key={person.name} className="flex flex-col items-center w-44">
                <div className="w-36 h-36 rounded-lg overflow-hidden mb-3 border border-neutral-border">
                  <img src={teamImages[i]} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-display text-sm text-deep-ink font-medium">{person.name}</p>
                <p className="text-xs text-deep-ink/60 font-body text-center">{person.role}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;

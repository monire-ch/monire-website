import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import BrandButton from './BrandButton';
import monika from '@/assets/monika.jpg';
import nicole from '@/assets/nicole.jpg';
import linkedinIcon from '@/assets/linkedin.svg';

const teamImages = [monika, nicole];
const teamLinkedIn = [
  'https://www.linkedin.com/in/monika-malecka/',
  'https://www.linkedin.com/in/nicole-pyra/',
];
const teamDetails = [
  {
    name: 'Monika Märki',
    origin: 'Polish-born, based in Switzerland',
    languages: 'Languages: Polish, English, German',
  },
  {
    name: 'Nikky Pyra',
    origin: 'Canadian-born, based in Switzerland',
    languages: 'Languages: English, German',
  },
];

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
          <span className="eyebrow-pill eyebrow-pill-dark mb-3">{t('about.eyebrow')}</span>
          <h2 className="font-body text-4xl md:text-5xl text-off-white">{t('about.title')}</h2>
        </ScrollReveal>

        <div className="space-y-0 mb-10 md:mb-20">
          {stories.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              {i > 0 && <div className="border-t border-white/10 my-0" />}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-start py-10">
                <h3 className="font-body text-xl md:text-2xl text-off-white">{item.title}</h3>
                <div>
                  <p className="text-base text-off-white font-body leading-relaxed">{item.text}</p>
                  {item.title === 'Giving Back' && (
                    <div className="mt-6 flex items-center gap-6">
                      <BrandButton type="link" to="/apply" variant="secondary" className="text-sm">
                        Apply here
                      </BrandButton>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="border-t border-white/10 mb-6 md:hidden" />

        <ScrollReveal>
          <span className="eyebrow-pill eyebrow-pill-dark mb-3">Meet the Duo</span>
          <h3 className="font-body text-2xl text-off-white mb-8">{t('about.teamTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {teamDetails.map((person, i) => (
              <div key={person.name} className="flex items-center gap-5">
                <div className="relative w-44 h-56 md:w-52 md:h-64 lg:w-[300px] lg:h-[375px] rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <img src={teamImages[i]} alt={person.name} className="w-full h-full object-cover" />
                  <a
                    href={teamLinkedIn[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name}'s LinkedIn`}
                    className="absolute bottom-2.5 right-2.5 z-10 flex items-center justify-center w-[2.4rem] h-[2.4rem] rounded-full border border-gold-text/40 bg-[#0a3440cc] backdrop-blur-sm transition-all duration-200 hover:border-gold-text/70 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]"
                  >
                    <img src={linkedinIcon} alt="" aria-hidden="true" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)' }} />
                  </a>
                </div>
                <div>
                  <h3 className="font-body text-base md:text-lg text-off-white font-medium">{person.name}</h3>
                  <p className="text-sm text-off-white font-body mt-1.5">{person.origin}</p>
                  <p className="text-xs text-off-white font-body mt-1">{person.languages}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;

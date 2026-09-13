import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

type PrivacySection = {
  title: string;
  body: string;
  items?: string[];
  after?: string;
};

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const sectionClass = 'mb-10';
  const headingClass = 'font-display text-xl md:text-2xl text-main-teal mb-4';
  const textClass = 'text-base font-body leading-relaxed mb-4';
  const listClass = 'list-disc pl-6 space-y-2 text-base font-body leading-relaxed mb-4';
  const textStyle = { color: '#0f4b5ae6' };
  const sections = t('privacy.sections', { returnObjects: true }) as PrivacySection[];

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      <main className="pt-36 md:pt-44 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="font-body text-4xl md:text-5xl text-main-teal mb-3">{t('privacy.title')}</h1>
            <p className="text-base font-body mb-12" style={textStyle}>
              {t('privacy.effectiveDate')}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className={textClass} style={textStyle}>
              {t('privacy.intro')}
            </p>
          </ScrollReveal>

          {sections.map((section) => (
            <ScrollReveal key={section.title} className={sectionClass}>
              <h2 className={headingClass}>{section.title}</h2>
              <p className={textClass} style={textStyle} dangerouslySetInnerHTML={{ __html: section.body }} />
              {section.items?.length ? (
                <ul className={listClass} style={textStyle}>
                  {section.items.map((item) => (
                    <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              ) : null}
              {section.after ? (
                <p className={textClass} style={textStyle} dangerouslySetInnerHTML={{ __html: section.after }} />
              ) : null}
            </ScrollReveal>
          ))}
        </div>
      </main>
      <Footer hideWave />
    </div>
  );
};

export default PrivacyPolicy;

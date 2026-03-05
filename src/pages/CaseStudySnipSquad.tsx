import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import snipSquad from '@/assets/snip-squad_full-hq.png';

const CaseStudySnipSquad = () => {
  const { t } = useTranslation();

  const tools = ['WEBFLOW', 'FIGMA', 'RELUME'];

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-36 md:pt-44 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <a
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm font-body text-main-teal hover:text-soft-teal transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              {t('caseStudy.back')}
            </a>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-12">
              Snip Squad
            </h1>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-16">
            {/* Scrollable website preview */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden border border-border bg-card h-[500px] md:h-[600px] overflow-y-auto">
                <img
                  src={snipSquad}
                  alt="Snip Squad website preview"
                  className="w-full h-auto"
                />
              </div>
            </ScrollReveal>

            {/* Metadata + description */}
            <div>
              <ScrollReveal>
                <div>
                  {[
                    { label: t('caseStudy.meta.client'), value: 'Snip Squad' },
                    { label: t('caseStudy.meta.date'), value: 'January 2026' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-border">
                      <span className="text-sm font-body text-main-teal">{row.label}</span>
                      <span className="text-sm font-body text-foreground">{row.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.category')}</span>
                    <span className="text-xs font-body font-medium px-3 py-1 rounded-full border border-border text-foreground">
                      Web Design & Web Development
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-4 border-b border-border">
                    <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.tools')}</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs font-body font-medium px-3 py-1 rounded-full border border-border text-foreground uppercase tracking-wide"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm font-body text-main-teal">Website</span>
                    <a
                      href="https://snipsquad.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="h-20" />
        </div>
      </main>
      <Footer hideWave />
    </>
  );
};

export default CaseStudySnipSquad;

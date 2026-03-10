import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import systemically from '@/assets/portfolio/systemically_full.webp';

const CaseStudySystemically = () => {
  const { t } = useTranslation();

  const tools = ['WEBFLOW', 'GOOGLE ANALYTICS'];

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
            <span className="eyebrow-pill eyebrow-pill-light">Web Development</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-12">
              SystemicAlly
            </h1>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-14 mb-16">
            {/* Metadata + description */}
            <div>
              <ScrollReveal>
                <div>
                  {[
                    { label: t('caseStudy.meta.client'), value: 'SystemicAlly' },
                    { label: t('caseStudy.meta.date'), value: 'May 2025' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-border">
                      <span className="text-sm font-body text-main-teal">{row.label}</span>
                      <span className="text-sm font-body text-foreground">{row.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.category')}</span>
                    <span className="text-xs font-body font-medium px-3 py-1 rounded-full border border-border text-foreground">
                      Web Development
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
                      href="https://www.systemically.ch"
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

            {/* Scrollable website preview */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden border border-border bg-card h-[560px] md:h-[720px] overflow-y-auto">
                <img
                  src={systemically}
                  alt="SystemicAlly website preview"
                  className="w-auto max-w-full h-auto block mx-auto"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="h-20" />
        </div>
      </main>
      <Footer hideWave />
    </>
  );
};

export default CaseStudySystemically;

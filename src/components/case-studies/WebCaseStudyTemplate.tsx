import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import type { WebCaseStudyConfig } from '@/config/caseStudies';

type WebCaseStudyTemplateProps = {
  project: WebCaseStudyConfig;
};

const WebCaseStudyTemplate = ({ project }: WebCaseStudyTemplateProps) => {
  const { t } = useTranslation();

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
            <span className="eyebrow-pill eyebrow-pill-light">{project.eyebrow}</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-12">
              {project.title}
            </h1>
          </ScrollReveal>

          <div className="case-study-web-grid">
            <div>
              <ScrollReveal>
                <div>
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.client')}</span>
                    <span className="text-sm font-body text-foreground">{project.client}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.date')}</span>
                    <span className="text-sm font-body text-foreground">{project.date}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.category')}</span>
                    <span className="text-xs font-body font-medium px-3 py-1 rounded-full border border-border text-foreground">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-4 border-b border-border">
                    <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.tools')}</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {project.tools.map((tool) => (
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
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline"
                    >
                      {project.websiteLabel}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="case-study-web-preview">
                <img src={project.image} alt={project.imageAlt} className="case-study-web-image" />
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

export default WebCaseStudyTemplate;

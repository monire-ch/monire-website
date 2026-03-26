import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import type { CaseStudyConfig } from '@/config/caseStudies';

type CaseStudyTemplateProps = {
  project: CaseStudyConfig;
};

const CaseStudyTemplate = ({ project }: CaseStudyTemplateProps) => {
  const { t } = useTranslation();
  const isScrollablePreview = project.imageScrollable ?? true;
  const hasSections = Boolean(project.sections && project.sections.length > 0);
  const contentGridColumnsClassName = hasSections
    ? 'md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'
    : 'md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]';
  const contentGridClassName = `grid grid-cols-1 ${contentGridColumnsClassName} gap-10 md:gap-14 mb-16`;

  const metadataBlock = (
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
      {project.websiteUrl ? (
        <div className="flex justify-between items-center py-4">
          <span className="text-sm font-body text-main-teal">Website</span>
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline"
          >
            {project.websiteLabel ?? 'Visit Website'}
          </a>
        </div>
      ) : null}
    </div>
  );

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
            <span className="eyebrow-pill eyebrow-pill-light">{project.category}</span>
            <h1
              className={`font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight ${
                project.subtitle ? 'mb-4' : 'mb-12'
              }`}
            >
              {project.title}
            </h1>
            {project.subtitle ? (
              <p className="text-lg md:text-xl font-body text-foreground/80 mb-12">{project.subtitle}</p>
            ) : null}
          </ScrollReveal>

          <div className={contentGridClassName}>
            {hasSections ? (
              <>
                <ScrollReveal>
                  <div
                    className={`rounded-xl overflow-hidden border border-border bg-card ${
                      isScrollablePreview ? 'h-[560px] md:h-[720px] overflow-y-auto' : ''
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className={isScrollablePreview ? 'w-auto max-w-full h-auto block mx-auto' : 'w-full h-auto block'}
                    />
                  </div>
                </ScrollReveal>

                <div className="space-y-8">
                  {project.sections?.map((section) => (
                    <ScrollReveal key={section.title}>
                      <h2 className="font-tertiary italic text-2xl md:text-3xl text-main-teal mb-3">{section.title}</h2>
                      {section.intro ? <p className="text-sm font-body text-foreground/80 mb-2">{section.intro}</p> : null}
                      {section.items ? (
                        <ul className="space-y-1.5">
                          {section.items.map((item) => (
                            <li key={item} className="text-sm font-body text-foreground/70 flex items-start gap-2">
                              <span className="text-foreground/40 mt-0.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </ScrollReveal>
                  ))}
                </div>
              </>
            ) : (
              <>
                <ScrollReveal>{metadataBlock}</ScrollReveal>
                <ScrollReveal>
                  <div
                    className={`rounded-xl overflow-hidden border border-border bg-card ${
                      isScrollablePreview ? 'h-[560px] md:h-[720px] overflow-y-auto' : ''
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className={isScrollablePreview ? 'w-auto max-w-full h-auto block mx-auto' : 'w-full h-auto block'}
                    />
                  </div>
                </ScrollReveal>
              </>
            )}
          </div>

          {project.testimonial ? (
            <ScrollReveal>
              <div className="rounded-xl border border-border bg-card p-6 md:p-8 mb-14">
                <blockquote className="text-lg md:text-xl font-tertiary italic text-main-teal leading-relaxed">
                  "{project.testimonial.quote}"
                </blockquote>
                <p className="text-sm font-body text-foreground mt-4">
                  {project.testimonial.author}
                  {project.testimonial.role ? `, ${project.testimonial.role}` : ''}
                </p>
              </div>
            </ScrollReveal>
          ) : null}

          {hasSections ? <ScrollReveal>{metadataBlock}</ScrollReveal> : null}

          <div className="h-20" />
        </div>
      </main>
      <Footer hideWave />
    </>
  );
};

export default CaseStudyTemplate;

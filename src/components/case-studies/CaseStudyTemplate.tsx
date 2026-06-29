import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import type { CaseStudyCategory, CaseStudyConfig } from '@/config/caseStudies';
import { trackEvent } from '@/lib/analytics';
import { useLocalePath } from '@/hooks/useLocalePath';

type CaseStudyTemplateProps = {
  project: CaseStudyConfig;
};

const categoryPillClassName =
  "text-xs font-body font-medium px-3 py-1 rounded-full border border-border text-foreground";

const CaseStudyTemplate = ({ project }: CaseStudyTemplateProps) => {
  const { t } = useTranslation();
  const localePath = useLocalePath();
  const isScrollablePreview = project.imageScrollable ?? true;
  const hasSections = Boolean(project.sections && project.sections.length > 0);
  const categories = project.categories?.length ? project.categories : project.category ? [project.category] : [];
  const categoryLabels = categories.map((category) => t(`caseStudy.categoryLabels.${category as CaseStudyCategory}`));
  const contentGridColumnsClassName = hasSections
    ? 'md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'
    : 'md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]';
  const contentGridClassName = `grid grid-cols-1 ${contentGridColumnsClassName} gap-10 md:gap-14 mb-10`;

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
        <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.industry')}</span>
        <span className="text-sm font-body text-foreground">{project.industry}</span>
      </div>
      <div className="flex justify-between items-start py-4 border-b border-border gap-4">
        <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.category')}</span>
        <div className="flex flex-wrap gap-2 justify-end">
          {categoryLabels.map((categoryLabel) => (
            <span key={categoryLabel} className={categoryPillClassName}>
              {categoryLabel}
            </span>
          ))}
        </div>
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
        <div className="flex justify-between items-start py-4 gap-4">
          <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.website')}</span>
          <div className="text-right max-w-[200px] md:max-w-[280px]">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('case_study_external_site_click', {
                  location: 'case_study',
                  case_study: project.title.toLowerCase().replace(/\s+/g, '-'),
                  destination: project.websiteUrl,
                  page_path: window.location.pathname,
                })
              }
              className="text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline"
            >
              {project.websiteLabel ?? t('caseStudy.visitWebsite')}
            </a>
            <p className="text-xs font-body text-foreground/60 mt-1">
              {t('caseStudy.liveNote')}
            </p>
          </div>
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
              href={localePath('/#portfolio')}
              className="inline-flex items-center gap-2 text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline mb-8"
            >
              <ArrowLeft size={16} />
              {t('caseStudy.back')}
            </a>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {categoryLabels.map((categoryLabel) => (
                <span key={categoryLabel} className="eyebrow-pill eyebrow-pill-light">
                  {categoryLabel}
                </span>
              ))}
            </div>
            <h1
              className={`font-display text-4xl md:text-5xl lg:text-6xl text-main-teal leading-tight ${project.subtitle ? 'mb-4 md:mb-8' : 'mb-8 md:mb-16'}`}>
              {project.title}
            </h1>
            {project.subtitle ? (
              <p className="text-lg md:text-xl font-body text-soft-teal mb-7 md:mb-12">{project.subtitle}</p>
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
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className={isScrollablePreview ? 'w-auto max-w-full h-auto block mx-auto' : 'w-full h-auto block'}
                      />
                    ) : null}
                  </div>
                </ScrollReveal>

                <div className="space-y-8">
                  {project.sections?.map((section) => (
                    <ScrollReveal key={section.title}>
                      <h2 className="font-tertiary italic text-2xl md:text-3xl text-focus-teal mb-3">{section.title}</h2>
                      {section.intro ? (
                        <p className="text-sm font-body text-foreground mb-2 whitespace-pre-line">{section.intro}</p>
                      ) : null}
                      {section.items ? (
                        <ul className="space-y-1.5">
                          {section.items.map((item) => (
                            <li key={item} className="text-sm font-body text-foreground flex items-start gap-2">
                              <span className="text-foreground/60 mt-0.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {section.visualImage ? (
                        <div
                          className={`mt-6 overflow-hidden rounded-xl border border-border bg-card ${
                            section.visualImage.scrollable ? 'h-[360px] overflow-y-auto' : ''
                          }`}
                        >
                          <img
                            src={section.visualImage.src}
                            alt={section.visualImage.alt}
                            className={section.visualImage.scrollable ? 'w-auto max-w-full h-auto block mx-auto' : 'w-full h-auto block'}
                          />
                        </div>
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
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className={isScrollablePreview ? 'w-auto max-w-full h-auto block mx-auto' : 'w-full h-auto block'}
                      />
                    ) : null}
                  </div>
                </ScrollReveal>
              </>
            )}
          </div>

          {project.metrics?.length ? (
            <ScrollReveal>
              <section
                aria-labelledby="case-study-results-title"
                className="grid grid-cols-1 gap-8 border-y border-border py-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16 md:py-14 mb-14"
              >
                <div>
                  <h2
                    id="case-study-results-title"
                    className="font-tertiary italic text-3xl md:text-4xl text-main-teal mb-4"
                  >
                    {t('caseStudy.keyResults')}
                  </h2>
                  <p className="max-w-sm text-base font-body leading-relaxed text-foreground">
                    {t('caseStudy.keyResultsIntro')}
                  </p>
                </div>

                <div>
                  {project.metrics.map((metric, index) => (
                    <div
                      key={`${metric.value}-${metric.description}`}
                      className={`grid grid-cols-[120px_minmax(0,1fr)] items-center gap-5 py-7 first:pt-0 last:pb-0 sm:grid-cols-[180px_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 ${
                        index > 0 ? 'border-t border-border' : ''
                      }`}
                    >
                      <p
                        className={`w-full whitespace-nowrap text-center font-display text-main-teal leading-none ${
                          metric.value.length > 6
                            ? 'text-4xl sm:text-5xl md:text-6xl'
                            : 'text-5xl md:text-6xl'
                        }`}
                      >
                        {metric.value}
                      </p>
                      <p className="max-w-lg text-base md:text-lg font-body leading-relaxed text-foreground">
                        {metric.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ) : null}

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

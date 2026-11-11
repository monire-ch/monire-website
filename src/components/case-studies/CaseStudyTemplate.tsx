import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import StarIcon from '@/components/StarIcon';
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
  const contentGridColumnsClassName = hasSections && !project.image
    ? 'md:grid-cols-1 md:max-w-4xl'
    : hasSections
    ? 'md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]'
    : 'md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]';
  const contentGridClassName = `grid grid-cols-1 ${contentGridColumnsClassName} gap-10 md:gap-14 mb-10`;

  const metadataBlock = (
    <div>
      {project.client ? (
        <div className="flex flex-col items-start gap-2 py-4 border-b border-border sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.client')}</span>
          <span className="text-sm font-body text-foreground sm:text-right">{project.client}</span>
        </div>
      ) : null}
      <div className="flex flex-col items-start gap-2 py-4 border-b border-border sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.industry')}</span>
        <span className="text-sm font-body text-foreground sm:text-right">{project.industry}</span>
      </div>
      <div className="flex flex-col items-start gap-2 py-4 border-b border-border sm:flex-row sm:justify-between sm:gap-4">
        <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.category')}</span>
        <div className="flex max-w-full flex-wrap gap-2 sm:justify-end">
          {categoryLabels.map((categoryLabel) => (
            <span key={categoryLabel} className={categoryPillClassName}>
              {categoryLabel}
            </span>
          ))}
        </div>
      </div>
      {project.tools?.length ? (
        <div className="flex flex-col items-start gap-2 py-4 border-b border-border sm:flex-row sm:justify-between sm:gap-4">
          <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.tools')}</span>
          <div className="flex max-w-full flex-wrap gap-2 sm:justify-end">
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
      ) : null}
      {project.websiteUrl ? (
        <div className="flex flex-col items-start gap-2 py-4 sm:flex-row sm:justify-between sm:gap-4">
          <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.website')}</span>
          <div className="max-w-full text-left sm:max-w-[280px] sm:text-right">
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
            {project.showLiveNote === false ? null : (
              <p className="text-xs font-body text-foreground/60 mt-1">
                {t('caseStudy.liveNote')}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );

  const testimonialBlock = (marginClassName = 'mb-10') => project.testimonial ? (
    <ScrollReveal>
      <div className={`rounded-xl border border-border bg-card p-6 md:p-8 ${marginClassName}`}>
        <blockquote className="text-lg md:text-xl font-tertiary italic text-main-teal leading-relaxed">
          "{project.testimonial.quote}"
        </blockquote>
        <p className="text-sm font-body text-foreground mt-4">
          {project.testimonial.author}
          {project.testimonial.role ? `, ${project.testimonial.role}` : ''}
        </p>
      </div>
    </ScrollReveal>
  ) : null;

  const sectionsBlock = (
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
  );

  return (
    <>
      <Navbar />
      <main className={`bg-background min-h-screen pb-0 ${project.comparison ? 'pt-28 md:pt-32' : 'pt-36 md:pt-44'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <a
              href={localePath('/#portfolio')}
              className={`inline-flex items-center gap-2 text-sm font-body text-main-teal hover:text-soft-teal transition-colors underline hover:no-underline ${project.comparison ? 'mb-5' : 'mb-8'}`}
            >
              <ArrowLeft size={16} />
              {t('caseStudy.back')}
            </a>
          </ScrollReveal>

          <ScrollReveal>
            <div className={`flex flex-wrap gap-2 ${project.comparison ? 'mb-4' : 'mb-6 md:mb-8'}`}>
              {categoryLabels.map((categoryLabel) => (
                <span key={categoryLabel} className="eyebrow-pill eyebrow-pill-light">
                  {categoryLabel}
                </span>
              ))}
            </div>
            <h1
              className={`font-display text-4xl md:text-5xl lg:text-6xl text-main-teal leading-tight ${project.subtitle ? project.comparison ? 'mb-3' : 'mb-4 md:mb-8' : 'mb-8 md:mb-16'}`}>
              {project.title}
            </h1>
            {project.subtitle ? (
              <p className={`text-lg md:text-xl font-body text-soft-teal ${project.comparison ? 'mb-8' : 'mb-7 md:mb-12'}`}>{project.subtitle}</p>
            ) : null}
          </ScrollReveal>

          {project.testimonialPlacement === 'top' ? testimonialBlock() : null}

          {project.comparison ? (
            <ScrollReveal>
              <section aria-labelledby="case-study-comparison-title" className="mb-10">
                <div className="mb-8 flex w-full max-w-sm items-center justify-center gap-4 text-gold" aria-hidden="true">
                  <span className="h-px flex-1 bg-main-teal/15" />
                  <StarIcon size={16} />
                  <span className="h-px flex-1 bg-main-teal/15" />
                </div>
                <div className="mb-6 max-w-3xl">
                  <h2 id="case-study-comparison-title" className="font-tertiary italic text-3xl text-main-teal md:text-4xl">
                    {project.comparison.title}
                  </h2>
                  {project.comparison.intro ? (
                    <p className="mt-3 font-body text-base leading-relaxed text-foreground">{project.comparison.intro}</p>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[
                    { label: project.comparison.beforeLabel, image: project.comparison.beforeImage, mobileOrder: 'order-2 md:order-none' },
                    { label: project.comparison.afterLabel, image: project.comparison.afterImage, mobileOrder: 'order-1 md:order-none' },
                  ].map(({ label, image, mobileOrder }) => (
                    <figure key={label} className={mobileOrder}>
                      <figcaption className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-main-teal">
                        {label}
                      </figcaption>
                      <div className={`overflow-hidden rounded-xl border border-border bg-card ${image.scrollable ? 'h-[480px] overflow-y-auto md:h-[600px]' : ''}`}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className={image.scrollable ? 'mx-auto block h-auto w-auto max-w-full' : 'block h-auto w-full'}
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ) : null}

          {project.comparison && project.testimonialPlacement !== 'top' ? testimonialBlock() : null}

          <div className={contentGridClassName}>
            {hasSections ? (
              <>
                {project.image ? <ScrollReveal>
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
                </ScrollReveal> : null}

                {project.image && project.testimonial && project.testimonialPlacement !== 'top' ? (
                  <div className="space-y-8">
                    <div className="md:hidden">{testimonialBlock('')}</div>
                    {sectionsBlock}
                  </div>
                ) : sectionsBlock}
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

          {!project.comparison && project.testimonialPlacement !== 'top' ? (
            project.image && project.testimonial ? (
              <div className="hidden md:block">{testimonialBlock()}</div>
            ) : testimonialBlock()
          ) : null}

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

          {hasSections ? <ScrollReveal>{metadataBlock}</ScrollReveal> : null}

          <div className="h-20" />
        </div>
      </main>
      <Footer hideWave />
    </>
  );
};

export default CaseStudyTemplate;

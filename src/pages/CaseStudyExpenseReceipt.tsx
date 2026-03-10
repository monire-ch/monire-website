import { useTranslation } from 'react-i18next';

import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import n8nPreview from '@/assets/portfolio/n8n.webp';

const CaseStudyExpenseReceipt = () => {
  const { t } = useTranslation();

  const tools = ['OUTLOOK', 'N8N', 'ONEDRIVE', 'EXCEL', 'OCR + AI EXTRACTION'];

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen pt-36 md:pt-44 pb-0">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back link */}
          <ScrollReveal>
            <a
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm font-body text-main-teal hover:text-soft-teal transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              {t('caseStudy.back')}
            </a>
          </ScrollReveal>

          {/* Eyebrow */}
          <ScrollReveal>
            <div className="mb-8">
              <span className="eyebrow-pill eyebrow-pill-light">
                {t('caseStudy.eyebrow')}
              </span>
            </div>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-12">
              {t('caseStudy.title')}
            </h1>
          </ScrollReveal>

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-16">
            {/* Image */}
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden bg-card border border-border">
                <img
                  src={n8nPreview}
                  alt="Expense Receipt Automation workflow"
                  className="w-full h-auto"
                />
              </div>
            </ScrollReveal>

            {/* Before / After / Impact */}
            <div className="space-y-8">
              <ScrollReveal>
                <h2 className="font-tertiary italic text-2xl md:text-3xl text-main-teal mb-3">
                  {t('caseStudy.before.title')}
                </h2>
                <p className="text-sm font-body text-foreground/80 mb-2">
                  {t('caseStudy.before.intro')}
                </p>
                <ul className="space-y-1.5">
                  {(t('caseStudy.before.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i} className="text-sm font-body text-foreground/70 flex items-start gap-2">
                      <span className="text-foreground/40 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="font-tertiary italic text-2xl md:text-3xl text-main-teal mb-3">
                  {t('caseStudy.after.title')}
                </h2>
                <p className="text-sm font-body text-foreground/80 mb-2">
                  {t('caseStudy.after.intro')}
                </p>
                <ul className="space-y-1.5">
                  {(t('caseStudy.after.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i} className="text-sm font-body text-foreground/70 flex items-start gap-2">
                      <span className="text-foreground/40 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="font-tertiary italic text-2xl md:text-3xl text-main-teal mb-3">
                  {t('caseStudy.impact.title')}
                </h2>
                <p className="text-sm font-body text-foreground/80 mb-2">
                  {t('caseStudy.impact.intro')}
                </p>
                <ul className="space-y-1.5">
                  {(t('caseStudy.impact.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i} className="text-sm font-body text-foreground/70 flex items-start gap-2">
                      <span className="text-foreground/40 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>

          {/* Metadata table */}
          <ScrollReveal>
            <div>
              {[
                { label: t('caseStudy.meta.client'), value: 'Brooksmiller & Partners AG' },
                { label: t('caseStudy.meta.date'), value: 'August 2025' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-border">
                  <span className="text-sm font-body text-main-teal">{row.label}</span>
                  <span className="text-sm font-body text-foreground">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-4 border-b border-border">
                <span className="text-sm font-body text-main-teal">{t('caseStudy.meta.category')}</span>
                <span className="text-xs font-body font-medium px-3 py-1 rounded-full border border-border text-foreground">
                  AI Automation
                </span>
              </div>
              <div className="flex justify-between items-start py-4">
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
            </div>

          </ScrollReveal>

          <div className="h-20" />
        </div>
      </main>
      <Footer hideWave />
    </>
  );
};

export default CaseStudyExpenseReceipt;
